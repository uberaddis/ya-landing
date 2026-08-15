# Account-deletion client plumbing

This folder powers the public `/delete-account` page. `/account-deletion` redirects there for backwards compatibility. It remains deliberately unlinked from site navigation.

## Configuration

Set both public browser endpoint variables in the deployment environment:

```text
NEXT_PUBLIC_RIDER_API_GRAPHQL_URL=https://yaride.et/rider-api/graphql
NEXT_PUBLIC_DRIVER_API_GRAPHQL_URL=https://yaride.et/driver-api/graphql
```

The browser must be allowed by API CORS policy. Because `verifyOtp` returns the access token in a response header, that policy must also expose `X-Access-Token` with `Access-Control-Expose-Headers`; allowing the origin alone does not make a non-safelisted header readable to browser JavaScript.

## Integration boundary

`app/account-deletion/AccountDeletionForm.tsx` creates `AccountDeletionOtpFlow` in a client-component ref for the page lifetime. For the public deletion path it calls `requestOtp(role, phoneInput)`, then `requestDeletion(role, code)`. `requestAccountDeletion` verifies and consumes the OTP itself, so the public page must not call `verifyOtp` first.

The current load-bearing assumption is one OTP challenge per role/API. A number that owns both a rider and driver account must therefore be verified independently for each role. The only role-specific orchestration lives in `flow.ts`, so a later cross-API ticket can replace that boundary without changing the transport client or consumer-facing method sequence.

OTP hashes and verification state are held only in the flow instance's memory. No code in this module reads or writes cookies, localStorage, sessionStorage, or refresh tokens.

`requestAccountDeletion` is implemented against the approved backend contract but will return a schema error until the backend mutation is deployed.

For deletion blockers, the client recognizes trip-in-progress, wallet-balance, and outstanding-balance GraphQL errors. To show the approved wallet message with its amount, the final backend error should use a wallet-balance code/message and return the numeric balance in `extensions.walletBalance` (or `extensions.balance`).
