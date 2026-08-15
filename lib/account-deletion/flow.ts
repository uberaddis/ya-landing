import {
  AccountDeletionGraphQLClient,
  type AccountDeletionEndpoints,
} from "./client";
import { normalizeEthiopianMobileNumber } from "./phone";
import {
  AccountDeletionApiError,
  type AccountRole,
  type AccountDeletionRequestResult,
  type OtpChallenge,
} from "./types";

interface StoredChallenge extends OtpChallenge {
  hash: string;
}

/**
 * In-memory orchestration for a future client component. Do not put an
 * instance in module state, browser storage, or cookies: it holds OTP hashes
 * for the active page only.
 *
 * Load-bearing current assumption: rider and driver have independent OTP
 * challenges. A user with both account types must complete this flow once per
 * role. If the APIs introduce one cross-service ticket, replace only this
 * orchestration boundary; the GraphQL transport and deletion calls remain
 * role-scoped.
 */
export class AccountDeletionOtpFlow {
  private readonly challenges = new Map<AccountRole, StoredChallenge>();

  constructor(private readonly client: AccountDeletionGraphQLClient) {}

  static fromEnvironment(): AccountDeletionOtpFlow {
    return new AccountDeletionOtpFlow(AccountDeletionGraphQLClient.fromEnvironment());
  }

  static withEndpoints(endpoints: AccountDeletionEndpoints): AccountDeletionOtpFlow {
    return new AccountDeletionOtpFlow(new AccountDeletionGraphQLClient(endpoints));
  }

  async requestOtp(role: AccountRole, phoneInput: string): Promise<OtpChallenge> {
    const mobileNumber = normalizeEthiopianMobileNumber(phoneInput);
    const hash = await this.client.verifyNumber(role, mobileNumber);

    const challenge = { role, mobileNumber, hash };
    this.challenges.set(role, challenge);

    return { role, mobileNumber };
  }

  async requestDeletion(
    role: AccountRole,
    code: string,
  ): Promise<AccountDeletionRequestResult> {
    const challenge = this.challenges.get(role);
    if (!challenge) {
      throw new AccountDeletionApiError({
        code: "OTP_CHALLENGE_MISSING",
        userMessage: "Request a verification code before entering it.",
      });
    }

    const normalizedCode = code.trim();
    if (!normalizedCode) {
      throw new AccountDeletionApiError({
        code: "OTP_CODE_REQUIRED",
        userMessage: "Enter the verification code we sent you.",
      });
    }

    // No client retry: backend limits, expiry, and attempt counting remain the
    // source of truth and are converted to user-safe errors by the client.
    try {
      return await this.client.requestAccountDeletion(role, {
        mobileNumber: challenge.mobileNumber,
        otpHash: challenge.hash,
        otpCode: normalizedCode,
      });
    } finally {
      // The API consumes the OTP whether it accepts, blocks, or rejects the
      // request. Never retain a challenge for a second submission.
      this.clearRole(role);
    }
  }

  clearRole(role: AccountRole): void {
    this.challenges.delete(role);
  }

  clear(): void {
    this.challenges.clear();
  }
}
