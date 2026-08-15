# Public Account Deletion — URL, Authentication & API Reference

Audience: the **yaride.et website** team (separate Next.js repo) and app-store
reviewers. This documents the publicly reachable account-deletion page and the
exact GraphQL requests behind it.

> **Status (2026-08-15).** The **authentication** mutations in §3 are **live today**.
> The **deletion** mutations in §4 (`requestAccountDeletion`, `cancelAccountDeletion`,
> `accountDeletionStatus`) are the **approved design (plan §10) but are NOT deployed
> yet** — they ship with Phases 1+ of the account-deletion feature, which are gated on
> the §11a stop-gates (see [plans/2026-08-15-account-deletion.md](plans/2026-08-15-account-deletion.md)).
> Until then, the website page should be built against §3 and switched on for §4 when
> the mutations land. Field names/params below are the contract to build against.

---

## 1. The public URL

Apple (5.1.1(v)) and Google Play require a deletion entry point reachable **without
installing or logging into the app**. That is a page on the marketing site:

```
https://yaride.et/delete-account
```

- Owned by the **website (Next.js) repo**, not this monorepo.
- Must be linked from both app listings and from each app's in-app settings.
- The page collects the phone number + OTP and calls the GraphQL API below. It does
  **not** need the user to be logged in.
- Because a phone can be **both a rider and a driver** (two separate backends), the
  page presents a role choice — **Rider / Driver / Both** — and runs the flow against
  the matching API(s). "Both" runs the sequence twice (one OTP per API; see §5).

## 2. API hosts, transport & headers

Both mobile backends are NestJS GraphQL services behind Traefik, routed by path on the
same host (`Host(<TRAEFIK_HOST>) && PathPrefix(/rider-api | /driver-api)`; the prefix
is stripped before reaching the container, whose GraphQL path is `/graphql`).

| Role | GraphQL endpoint (production) |
|---|---|
| Rider | `https://<API_HOST>/rider-api/graphql` |
| Driver | `https://<API_HOST>/driver-api/graphql` |

- `<API_HOST>` = the deployed Traefik host (`TRAEFIK_HOST`, e.g. `yaride.et`). Confirm
  the exact value with ops; local dev is `http://localhost/{rider,driver}-api/graphql`.
- **Method:** `POST`, `Content-Type: application/json`. Standard GraphQL envelope
  (`{ "query": "...", "variables": { ... } }`).
- **`x-device-hash` header** — required by any mutation that **issues tokens**
  (`verifyOtp`, `refreshToken`, and the authenticated deletion calls). Send a stable,
  per-browser random string (e.g. a UUID persisted in `localStorage`). `verifyNumber`
  and the unauthenticated `requestAccountDeletion` do **not** require it.
- **Tokens are returned in response headers**, not the JSON body:
  `X-Access-Token` and `X-Refresh-Token` (exposed via `Access-Control-Expose-Headers`).
- **CORS / rate limits (ops prerequisites):** the API host must allow the website
  origin as a CORS origin **and** expose `X-Access-Token, X-Refresh-Token`. The OTP
  mutations are rate-limited server-side (`verifyNumber`/`verifyOtp`: 3 requests / 60s
  per client on rider-api); surface a friendly "try again shortly" on HTTP `429`.

### Phone number format

Send E.164-style Ethiopian numbers: **`251` + 9 digits** (e.g. `251911223344`). The
server also normalizes local inputs (`09XXXXXXXX`, `9XXXXXXXX`, `+251…`, spaces,
hyphens) to `251XXXXXXXXX`; anything not matching `^251\d{9}$` is rejected.

---

## 3. Authentication (LIVE) — prove phone ownership via OTP

Deletion must be gated on OTP so only the phone owner can trigger it. There are two
ways to consume the OTP depending on which deletion call you use:

- **For `requestAccountDeletion` (§4):** you only need `verifyNumber` to *send* the
  OTP; pass the returned `hash` + the user's code straight into `requestAccountDeletion`,
  which verifies it. **Do not** call `verifyOtp` as well — the OTP is single-use.
- **For the authenticated calls `cancelAccountDeletion` / `accountDeletionStatus`:**
  run the full `verifyNumber → verifyOtp` login to obtain a Bearer token.

### 3.1 `verifyNumber` — send the OTP SMS

**Important:** an existing account (one with a password set) returns
`{ isExistingUser: true }` and **no OTP is sent** unless you pass
**`forceSendOtp: true`**. For deletion you always want the OTP, so always pass it.

```graphql
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
    hash        # opaque; pass back to verifyOtp / requestAccountDeletion
  }
}
```

| Variable | Type | Required | Notes |
|---|---|---|---|
| `mobileNumber` | `String!` | yes | `251XXXXXXXXX` |
| `countryIso` | `String` | no | e.g. `"ET"` |
| `forceSendOtp` | `Boolean` | no | **pass `true`** for the deletion flow |

`curl` (rider):

```bash
curl -sS https://<API_HOST>/rider-api/graphql \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "mutation($m:String!,$f:Boolean){verifyNumber(mobileNumber:$m,forceSendOtp:$f){isExistingUser hash}}",
    "variables": { "m": "251911223344", "f": true }
  }'
```

Response:

```json
{ "data": { "verifyNumber": { "isExistingUser": true, "hash": "<opaque-hash>" } } }
```

### 3.2 `verifyOtp` — exchange the code for tokens (only for cancel/status)

Requires the `x-device-hash` header. Tokens come back in **response headers**.

```graphql
mutation VerifyOtp($hash: String!, $code: String!) {
  verifyOtp(hash: $hash, code: $code) {
    hasName
    hasPassword
  }
}
```

| Variable | Type | Required | Notes |
|---|---|---|---|
| `hash` | `String!` | yes | the `hash` from `verifyNumber` |
| `code` | `String!` | yes | the SMS OTP the user entered |

`curl` (rider) — note the device-hash header and reading the token header:

```bash
curl -sS -D - https://<API_HOST>/rider-api/graphql \
  -H 'Content-Type: application/json' \
  -H 'x-device-hash: <persistent-browser-uuid>' \
  -d '{
    "query": "mutation($h:String!,$c:String!){verifyOtp(hash:$h,code:$c){hasName hasPassword}}",
    "variables": { "h": "<opaque-hash>", "c": "123456" }
  }'
# → response headers include:  X-Access-Token: <jwt>   X-Refresh-Token: <token>
```

Use `Authorization: Bearer <X-Access-Token>` on the authenticated calls in §4.

---

## 4. Deletion endpoints (PLANNED — plan §10, not yet deployed)

Same field names exist on **both** `rider-api` and `driver-api` (per role). Build the
website against these; they go live with Phases 1+.

### 4.1 `requestAccountDeletion` — start the 30-day deletion (unauthenticated, OTP-gated)

The primary call for the public page. No Bearer token, no device hash — it verifies the
OTP itself from `otpHash` + `otpCode` (so **skip `verifyOtp`** for this path).

```graphql
mutation RequestAccountDeletion(
  $mobileNumber: String!
  $otpHash: String!
  $otpCode: String!
) {
  requestAccountDeletion(
    mobileNumber: $mobileNumber
    otpHash: $otpHash
    otpCode: $otpCode
  ) {
    status        # PendingDeletion | Blocked | NoAccount
    anonymizeAt   # ISO date the account is permanently anonymized (grace end)
    role          # Rider | Driver
    reason        # when Blocked: ActiveRide | PositiveBalance | DriverDebt
  }
}
```

| Variable | Type | Required | Notes |
|---|---|---|---|
| `mobileNumber` | `String!` | yes | `251XXXXXXXXX` |
| `otpHash` | `String!` | yes | the `hash` from `verifyNumber` (§3.1, with `forceSendOtp:true`) |
| `otpCode` | `String!` | yes | the SMS OTP the user entered |

Result handling:

| `status` | Meaning | Show the user |
|---|---|---|
| `PendingDeletion` | Accepted. Sessions revoked immediately; anonymized at `anonymizeAt`. | "Scheduled for deletion on `<anonymizeAt>`. Reinstall & log in before then to cancel." |
| `Blocked` | Ineligible (`reason`). Must be resolved via support first. | Explain `reason`; link support. No self-service cash-out exists. |
| `NoAccount` | No account for that number in this API/role. | "No `<role>` account found for this number." |

Disclosing existence here is safe: the caller proved phone ownership via OTP, so this
is not an enumeration vector.

`curl` (rider):

```bash
curl -sS https://<API_HOST>/rider-api/graphql \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "mutation($m:String!,$h:String!,$c:String!){requestAccountDeletion(mobileNumber:$m,otpHash:$h,otpCode:$c){status anonymizeAt role reason}}",
    "variables": { "m": "251911223344", "h": "<opaque-hash>", "c": "123456" }
  }'
```

### 4.2 `cancelAccountDeletion` — recover during grace (authenticated)

Requires a Bearer token from a fresh OTP login (§3.1 + §3.2), because requesting
deletion revokes all existing sessions. Permitted even while the account is otherwise
locked during grace.

```graphql
mutation CancelAccountDeletion {
  cancelAccountDeletion {
    deletionState   # back to `active`
  }
}
```

Headers: `Authorization: Bearer <access-token>`, `x-device-hash: <uuid>`. No params.

### 4.3 `accountDeletionStatus` — read own status (authenticated)

```graphql
query AccountDeletionStatus {
  accountDeletionStatus {
    deletionState   # active | pending_deletion | anonymizing | anonymized
    anonymizeAt     # null unless pending_deletion
  }
}
```

Headers: `Authorization: Bearer <access-token>`. No params.

---

## 5. End-to-end sequence for the website page

**Delete (public, no login):**
1. User enters phone + selects role (Rider / Driver / Both).
2. `verifyNumber(mobileNumber, forceSendOtp: true)` against the chosen API → `hash`.
   (Repeat per API for "Both".)
3. User enters the OTP from SMS.
4. `requestAccountDeletion(mobileNumber, otpHash: hash, otpCode: code)` against the
   same API (repeat per API for "Both" — two OTPs, since the two backends do not share
   OTP state).
5. Show `status` + `anonymizeAt` (or the `Blocked`/`NoAccount` message).

**Recover (during the 30-day grace):**
1. `verifyNumber(forceSendOtp: true)` → `verifyOtp(hash, code)` → Bearer token.
2. `accountDeletionStatus` to confirm `pending_deletion` + `anonymizeAt`.
3. `cancelAccountDeletion` → `deletionState: active`.

### "Both" roles note
`rider-api` and `driver-api` are independent services and (currently) do **not** share
OTP state, so "Both" means running steps 2–4 **once per API** with a separate OTP each.
A single-OTP cross-API "deletion ticket" is a flagged open question (plan §11 Q1) and is
**not** part of this contract.

---

## 6. Quick reference

| Call | API(s) | Auth | Params | Status |
|---|---|---|---|---|
| `verifyNumber` | rider, driver | none | `mobileNumber`, `countryIso?`, `forceSendOtp?` | **live** |
| `verifyOtp` | rider, driver | `x-device-hash` | `hash`, `code` | **live** |
| `requestAccountDeletion` | rider, driver (per role) | OTP (`otpHash`+`otpCode`) | `mobileNumber`, `otpHash`, `otpCode` | planned |
| `cancelAccountDeletion` | rider, driver | Bearer + `x-device-hash` | — | planned |
| `accountDeletionStatus` | rider, driver | Bearer | — | planned |
