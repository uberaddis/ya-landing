export const accountRoles = ["rider", "driver"] as const;

export type AccountRole = (typeof accountRoles)[number];

export interface GraphQLErrorPayload {
  message?: string;
  extensions?: {
    code?: string;
    [key: string]: unknown;
  };
}

/**
 * Error shape intended for a future account-deletion UI. `userMessage` is safe
 * to show verbatim; `graphQLErrors` is retained for logging/diagnostics only.
 */
export class AccountDeletionApiError extends Error {
  readonly code: string;
  readonly userMessage: string;
  readonly graphQLErrors: GraphQLErrorPayload[];

  constructor(options: {
    code: string;
    userMessage: string;
    graphQLErrors?: GraphQLErrorPayload[];
  }) {
    super(options.userMessage);
    this.name = "AccountDeletionApiError";
    this.code = options.code;
    this.userMessage = options.userMessage;
    this.graphQLErrors = options.graphQLErrors ?? [];
  }
}

export function isAccountDeletionApiError(
  error: unknown,
): error is AccountDeletionApiError {
  return error instanceof AccountDeletionApiError;
}

export interface OtpChallenge {
  role: AccountRole;
  mobileNumber: string;
}

export interface VerifiedAccount {
  role: AccountRole;
}

export type AccountDeletionRequestStatus =
  | "PendingDeletion"
  | "Blocked"
  | "NoAccount";

export type AccountDeletionBlockReason =
  | "ActiveRide"
  | "PositiveBalance"
  | "DriverDebt";

export interface AccountDeletionRequestResult {
  status: AccountDeletionRequestStatus;
  anonymizeAt: string | null;
  role: "Rider" | "Driver" | null;
  reason: AccountDeletionBlockReason | null;
}
