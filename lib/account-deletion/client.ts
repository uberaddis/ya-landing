import {
  AccountDeletionApiError,
  type AccountRole,
  type AccountDeletionRequestResult,
  type GraphQLErrorPayload,
} from "./types";

export interface AccountDeletionEndpoints {
  rider: string;
  driver: string;
}

export interface GraphQLRequestOptions {
  accessToken?: string;
  deviceHash?: string;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLErrorPayload[];
}

interface GraphQLRequestResult<T> {
  data: T;
  headers: Headers;
}

const VERIFY_NUMBER_MUTATION = `
  mutation VerifyNumber(
    $mobileNumber: String!
    $countryIso: String
    $forceSendOtp: Boolean
  ) {
    verifyNumber(
      mobileNumber: $mobileNumber
      countryIso: $countryIso
      forceSendOtp: $forceSendOtp
    ) {
      isExistingUser
      hash
    }
  }
`;

const VERIFY_OTP_MUTATION = `
  mutation VerifyOtp($hash: String!, $code: String!) {
    verifyOtp(hash: $hash, code: $code)
  }
`;

/**
 * BACKEND STUB: replace this value and the mutation document when the final
 * account-deletion resolver contract is available. The current shape assumes
 * the JWT identifies the account and the resolver returns a scalar.
 */
export const ACCOUNT_DELETION_MUTATION_NAME = "requestAccountDeletion";

const ACCOUNT_DELETION_MUTATION = `
  mutation RequestAccountDeletion(
    $mobileNumber: String!
    $otpHash: String!
    $otpCode: String!
  ) {
    ${ACCOUNT_DELETION_MUTATION_NAME}(
      mobileNumber: $mobileNumber
      otpHash: $otpHash
      otpCode: $otpCode
    ) {
      status
      anonymizeAt
      role
      reason
    }
  }
`;

/**
 * Reads public browser-side endpoint configuration lazily, so a build can run
 * before deployment configuration exists. Both endpoints are required because
 * rider-api and driver-api are independent services.
 */
export function getAccountDeletionEndpoints(): AccountDeletionEndpoints {
  const rider = process.env.NEXT_PUBLIC_RIDER_API_GRAPHQL_URL;
  const driver = process.env.NEXT_PUBLIC_DRIVER_API_GRAPHQL_URL;

  if (!rider || !driver) {
    throw new AccountDeletionApiError({
      code: "API_CONFIGURATION_MISSING",
      userMessage: "This service is not configured yet. Please try again later.",
    });
  }

  return { rider, driver };
}

export class AccountDeletionGraphQLClient {
  constructor(private readonly endpoints: AccountDeletionEndpoints) {}

  static fromEnvironment(): AccountDeletionGraphQLClient {
    return new AccountDeletionGraphQLClient(getAccountDeletionEndpoints());
  }

  async verifyNumber(role: AccountRole, mobileNumber: string): Promise<string> {
    const result = await this.request<{
      verifyNumber: { hash?: unknown } | null;
    }>(
      role,
      VERIFY_NUMBER_MUTATION,
      { mobileNumber, countryIso: "ET", forceSendOtp: true },
    );

    const hash = extractHash(result.data.verifyNumber?.hash);
    if (!hash) {
      throw new AccountDeletionApiError({
        code: "OTP_HASH_MISSING",
        userMessage: "We could not start verification. Please request a new code.",
      });
    }

    return hash;
  }

  async verifyOtp(
    role: AccountRole,
    hash: string,
    code: string,
    deviceHash: string,
  ): Promise<string> {
    if (!deviceHash) {
      throw new AccountDeletionApiError({
        code: "DEVICE_HASH_REQUIRED",
        userMessage: "This verification cannot continue. Please try again later.",
      });
    }

    const result = await this.request<{ verifyOtp: unknown }>(
      role,
      VERIFY_OTP_MUTATION,
      { hash, code },
      { deviceHash },
    );

    // Tokens are deliberately read from the response header only. This client
    // never reads, writes, or refreshes persistent browser storage.
    const accessToken = result.headers.get("x-access-token");
    if (!accessToken) {
      throw new AccountDeletionApiError({
        code: "ACCESS_TOKEN_MISSING",
        userMessage: "Verification completed, but we could not continue. Please try again.",
      });
    }

    return accessToken;
  }

  /**
   * The public deletion mutation verifies the single-use OTP itself. It must
   * not receive a Bearer token or a device hash.
   */
  async requestAccountDeletion(
    role: AccountRole,
    input: {
      mobileNumber: string;
      otpHash: string;
      otpCode: string;
    },
  ): Promise<AccountDeletionRequestResult> {
    const result = await this.request<{
      requestAccountDeletion: AccountDeletionRequestResult;
    }>(
      role,
      ACCOUNT_DELETION_MUTATION,
      input,
    );

    return result.data.requestAccountDeletion;
  }

  private async request<T>(
    role: AccountRole,
    query: string,
    variables: Record<string, unknown>,
    options: GraphQLRequestOptions = {},
  ): Promise<GraphQLRequestResult<T>> {
    try {
      const response = await fetch(this.endpoints[role], {
        method: "POST",
        cache: "no-store",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          ...(options.accessToken
            ? { authorization: `Bearer ${options.accessToken}` }
            : {}),
          ...(options.deviceHash ? { "x-device-hash": options.deviceHash } : {}),
        },
        body: JSON.stringify({ query, variables }),
      });

      const payload = (await response.json().catch(() => null)) as GraphQLResponse<T> | null;
      if (!response.ok || payload?.errors?.length || !payload?.data) {
        throw toApiError(response.status, payload?.errors ?? []);
      }

      return { data: payload.data, headers: response.headers };
    } catch (error) {
      if (error instanceof AccountDeletionApiError) {
        throw error;
      }

      throw new AccountDeletionApiError({
        code: "NETWORK_ERROR",
        userMessage: "We could not reach the service. Check your connection and try again.",
      });
    }
  }
}

function extractHash(value: unknown): string | null {
  if (typeof value === "string") {
    return value;
  }

  // Tolerates a future scalar-wrapper response without changing the flow.
  if (
    value &&
    typeof value === "object" &&
    "hash" in value &&
    typeof value.hash === "string"
  ) {
    return value.hash;
  }

  return null;
}

function toApiError(
  status: number,
  graphQLErrors: GraphQLErrorPayload[],
): AccountDeletionApiError {
  const rawCode = graphQLErrors[0]?.extensions?.code;
  const code = typeof rawCode === "string" ? rawCode.toUpperCase() : "GRAPHQL_ERROR";
  const details = `${code} ${graphQLErrors.map((error) => error.message ?? "").join(" ")}`.toUpperCase();

  if (status === 429 || details.includes("RATE") || details.includes("TOO_MANY")) {
    return new AccountDeletionApiError({
      code: "RATE_LIMITED",
      userMessage: "Too many requests. Please wait before requesting another code.",
      graphQLErrors,
    });
  }

  if (details.includes("EXPIRED")) {
    return new AccountDeletionApiError({
      code: "OTP_EXPIRED",
      userMessage: "That verification code has expired. Request a new code.",
      graphQLErrors,
    });
  }

  if (details.includes("MAX") && details.includes("ATTEMPT")) {
    return new AccountDeletionApiError({
      code: "OTP_ATTEMPTS_EXCEEDED",
      userMessage: "Too many incorrect code attempts. Request a new code.",
      graphQLErrors,
    });
  }

  if (details.includes("TRIP") && (details.includes("PROGRESS") || details.includes("ACTIVE"))) {
    return new AccountDeletionApiError({
      code: "TRIP_IN_PROGRESS",
      userMessage: "You have a trip in progress. Complete it before deleting your account.",
      graphQLErrors,
    });
  }

  if (details.includes("WALLET") && details.includes("BALANCE")) {
    const balance = extractBalance(graphQLErrors);
    return new AccountDeletionApiError({
      code: "WALLET_BALANCE",
      userMessage: balance
        ? `You have a balance of ${balance} ETB. Contact support to settle it before deleting.`
        : "You have a wallet balance. Contact support to settle it before deleting.",
      graphQLErrors,
    });
  }

  if (details.includes("OUTSTANDING") && details.includes("BALANCE")) {
    return new AccountDeletionApiError({
      code: "OUTSTANDING_BALANCE",
      userMessage: "You have an outstanding balance owed to Ya Ride. Settle it before deleting.",
      graphQLErrors,
    });
  }

  if (details.includes("OTP") || details.includes("CODE") || details.includes("INVALID")) {
    return new AccountDeletionApiError({
      code: "OTP_INVALID",
      userMessage: "That verification code is not valid. Please try again.",
      graphQLErrors,
    });
  }

  if (status === 401 || status === 403 || details.includes("UNAUTH")) {
    return new AccountDeletionApiError({
      code: "UNAUTHORIZED",
      userMessage: "Verification is no longer valid. Please start again.",
      graphQLErrors,
    });
  }

  return new AccountDeletionApiError({
    code: status ? `HTTP_${status}` : code,
    userMessage: "We could not complete that request. Please try again.",
    graphQLErrors,
  });
}

function extractBalance(graphQLErrors: GraphQLErrorPayload[]): string | null {
  const extensions = graphQLErrors[0]?.extensions;
  const value = extensions?.walletBalance ?? extensions?.balance;

  if (typeof value === "number" && Number.isFinite(value)) {
    return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }

  if (typeof value === "string" && /^\d+(?:\.\d{1,2})?$/.test(value)) {
    return value;
  }

  return null;
}
