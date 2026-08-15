import { AccountDeletionApiError } from "./types";

/**
 * Converts common Ethiopian mobile-number input forms to the API contract:
 * `251` followed by nine local digits, with no `+` prefix.
 */
export function normalizeEthiopianMobileNumber(input: string): string {
  const digits = input.replace(/[^\d]/g, "");

  const normalized = digits.startsWith("0")
    ? `251${digits.slice(1)}`
    : digits.length === 9
      ? `251${digits}`
      : digits;

  if (!/^251\d{9}$/.test(normalized)) {
    throw new AccountDeletionApiError({
      code: "INVALID_MOBILE_NUMBER",
      userMessage:
        "Enter an Ethiopian mobile number in a valid format, for example 0911234567.",
    });
  }

  return normalized;
}
