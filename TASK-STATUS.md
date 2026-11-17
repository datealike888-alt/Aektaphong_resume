# Certificate additions — 2026-11-12

## Latest completed addition — 2026-11-13

- Added ZHTRAWT (AI Basic : ทักษะเอไอระดับพื้นฐาน), issuer SkillLane, issued 2026-11-12, sortOrder 17, featured=false. Title and ID were visually verified inside the supplied PDF and screenshot.
- Actual MySQL count before/after: 16 → 17. Insert-only seed added 1 certificate / 0 projects; second run added 0 / 0.
- Copied ZHTRAWT.pdf and ZHTRAWT.png to public/assets/certificates with exclusive creation, verifying SHA-256 against supplied files. No existing file was overwritten.
- All 16 existing rows, their order/featured flags, project rows, original seed entries and certificate file hashes match the pre-change snapshot.
- 55 focused checks passed on local Docker: HTTP 200/source hashes, displayed title/date/issuer, correct new-tab PDF, exact download bytes/name, no-JavaScript link, original homepage featured cards and layout at 320/390/1440px. No console/page/HTTP errors in the tested flow. Mobile/desktop screenshots visually checked.
- Refreshed only the local Docker asset/data layers using existing images; application source/design unchanged. No full build or broad test suite rerun. No deployment, database reset or volume deletion.
- Evidence: qa/certificate-ZHTRAWT/before.json, files.json, results.json, card-390.png, card-1440.png. No missing files for ZHTRAWT; no remaining work for this addition.

## Previous additions

Completed:
- No AGENTS.md existed at resume; next dev subsequently generated one and it was read. Workspace is not a Git repository.
- Verified the five new PDF pages against supplied screenshots: title, date and Certificate ID match.
- Database snapshot before latest batch: 11 certificates. ESJ3XND, 4HVOPCH, LYAPUA2 already existed and were skipped.
- Appended FZOV0CJ, MBT8TZ0, SLR6VT3, CKQES5T, ZDA0DKE to seed, sortOrder 12–16, featured=false; copied 10 new files exclusively without overwrite and checked hashes.
- Seed inserted 5 certificates / 0 projects; second run inserted 0 / 0. Seed is insert-only for existing IDs.
- 4HVOPCH uses image fallback: matching PDF was not supplied. QQ97F9C PDF was inspected and is a different existing certificate; it was not reused.
- Prior batch added 3 certificates and image fallback code, but browser verification was still pending when latest batch arrived.

Verification completed:
- 136 focused checks passed against current source on local Next.js dev server (port 3001), including MySQL comparisons against both original snapshots, unchanged files/featured cards, all certificate document HTTP/hash checks, new document open/download, image fallback, and 320/390/1440px layout.
- Actual DB total: 16. Latest batch added 5; skipped the 3 specified existing IDs. Original 11 entries, original 8 before the prior batch, project rows and source files all unchanged.
- Inspected SLR6VT3 long-title cards at mobile/desktop and 4HVOPCH image fallback visually: no crop, distortion or overflow observed.
- Targeted ESLint passed. No broad test suite rerun.

Final status: complete.
- Standard Docker rebuild was cancelled due very slow base-image download. Rebuild with existing local seed/runtime dependencies succeeded using qa/certificates-additions-5/Dockerfile.cached; original project Dockerfile is unchanged. Production compilation/type checks succeeded during that build.
- Local web image refreshed; web and MySQL healthy. Docker smoke verification confirms actual total 16, 15 added asset URLs return HTTP 200, all 8 cards from the two addition batches render, and 4HVOPCH uses its PNG link. See docker-smoke.json.
- No external deployment, no DB reset, no volume deletion. Original rows/order/featured flags and files remain unchanged.
- Remaining missing file: PDF for Canva Visual Suite / 4HVOPCH. Image fallback is functional; QQ97F9C was not substituted.

Evidence: qa/certificates-additions/before.json (original 8), qa/certificates-additions-5/before.json (original 11), new-files.json in both folders. No secrets stored here.

## Vercel readiness audit — 2026-11-13
- Local checks complete; production blocked on provisioned remote MySQL, provider TLS/CA/network access, and real Vercel environment validation. No deploy or production writes performed.
- Changes: Node 24.x engines; @vercel/functions pool lifecycle; verified DB_SSL/DB_SSL_CA; smaller pool/idle cleanup/fail-fast queue; connection/query timeouts; Vercel rejects local DB hosts or unencrypted DB config; standalone conditional; .vercelignore; seed accepts externally injected env and TLS.
- Passed local production build with VERCEL=1, lint, typecheck, 3 unit tests, 264 E2E checks / 20 viewports against current source with LOCAL MySQL. npm production dependency audit: 0 vulnerabilities. Case-sensitive asset paths and 17-certificate data verified; image fallback unchanged. Contact/private-path tests passed; server traces do not include archives or QA.
- No current DB password matches in scanned source/public/client chunks/text QA logs. No provider credentials printed. No production network or TLS verification claimed.
- README contains Vercel settings, required server env, non-destructive production seed procedure and limitations. Canonical/robots/sitemap deferred until a real domain is confirmed (not a runtime blocker).
- Existing Docker container has previous application code; this audit updates source/config only. No database reset, volume deletion, certificate edits or deployment.

## Vercel deployment continuation — 2026-11-13
- Deployment NOT performed: no .vercel/project.json linkage and no production MySQL configuration found in checked local env files. Existing .env targets local MySQL with TLS disabled; it was not used for Vercel.
- Global Vercel CLI not found. Attempted npx --yes vercel@latest whoami but it produced no result while waiting and was cancelled; account/project ownership remains unverified. No auth files found at standard checked locations. User must complete login personally.
- Official Vercel documentation confirms Node 24.x support. Retain Next.js / root . / npm run build settings from README.
- Seed data checked: 17 entries, 17 unique certificate IDs; 4HVOPCH remains the sole image-only fallback. This is a seed-file check, not a fresh database count. No application, asset or database changes made; previous local readiness tests remain the latest test evidence.
- Next: user runs npx --yes vercel@latest login in their terminal and identifies the existing Vercel project/team, if any. Prepare reachable remote MySQL for Preview/Production with verified TLS/CA, SELECT-only web credentials, and separate migration credentials through secure local env/dashboard entry (never chat).
- Once available: inspect destination/schema and back up existing data, perform insert-only seed, verify 17 certificates and project data, link existing project, configure secure env, deploy Preview and test live endpoints/documents/mobile; deploy Production only after Preview passes. Add canonical/robots/sitemap using the confirmed real production domain. No reset, volume deletion or production writes performed.

## Vercel project linked; awaiting database choice — 2026-11-13
- CLI 65.15.0 whoami verified datealike888-alt without login. Accessible Hobby scope: jbm-pro-auto-s-projects. Only existing project was jbm-pro-auto; left untouched.
- Created and linked aektaphong-portfolio in that account's Hobby scope. Verified remote settings: Next.js, root default (displayed .), Node 24.x, npm ci, npm run build, Next.js default output. No deployment.
- CLI generated ignored .vercel linkage and .env.local OIDC token. Token was not printed; .env* remains excluded by .vercelignore. Do not overwrite .env.local or expose its contents.
- Database options verified from official pages: Aiven MySQL Developer $5/month, 8GB storage/1GB RAM/1 CPU, single node, no HA/SLA, cannot choose region; new MySQL free plans retired. Verified TLS requires project CA. TiDB Cloud Starter is MySQL-compatible (not MySQL engine), $0 within per-instance 5GiB row + 5GiB columnar + 50M RU/month allowance; set spending limit 0, quota exhaustion can restrict/suspend service, free concurrency limit 400. Node trusted CA supports verified TLS. Compatibility with this app still requires testing.
- Sources: https://aiven.io/pricing/mysql ; https://aiven.io/free-mysql-database-retired ; https://aiven.io/docs/platform/concepts/tls-ssl-certificates ; https://www.pingcap.com/pricing/ ; https://docs.pingcap.com/tidbcloud/create-tidb-cluster-serverless/ ; https://docs.pingcap.com/tidbcloud/serverless-limitations/ ; https://docs.pingcap.com/tidb/dev/dev-guide-sample-application-nodejs-mysql2/
- Await user selecting/provisioning provider personally. No paid service subscribed, no remote DB credentials or endpoint yet. Prepare separate Preview/Production databases, SELECT-only web user, separate migration user; enter credentials in Vercel Environment Variables / ignored local env files, never chat. DB_SSL=true, provider CA in DB_SSL_CA when required.
- Pending: verify remote destination/TLS/schema and backup before insert-only seed; validate all 17 certificates and 2 projects/order/featured; Preview live tests then authorized Production and real-domain metadata. No seed, DB write, reset, volume removal, data/asset/design changes, or broad test reruns in this step.

## TiDB Starter selected — 2026-11-13
- User chose MySQL-compatible TiDB Cloud Starter, spending limit 0; user will sign up/provision personally. No paid plan or payment authorization.
- Instructions: sign up directly at tidbcloud.com; My TiDB > Create Resource > Starter > MySQL Compatible; choose AWS Singapore (ap-southeast-1), name aektaphong-portfolio, spending limit 0, Create. Do not choose Essential/Premium or enable paid extras.
- Recommended pairing for Thailand users: Vercel Functions Singapore (sin1), single region on Hobby. Current default is not yet changed; set only after actual DB region confirmation. Sandbox region shown by CLI is not proof of Functions region.
- Pending user instance creation. User should report only readiness/region, never passwords. Then prepare separate ignored local migration env and SELECT-only web env securely; do not overwrite existing .env or .env.local. Verify TLS and TiDB schema/query/seed compatibility against the new target, inspect/backup before insert-only import. Preserve 17 certificates and existing order/featured/assets.
- At spending limit 0, Starter stays free within quota; exhaustion can restrict connections/service rather than authorize paid upgrades. No deployment/DB connection/seed attempted this step. Continue Preview tests then Production only after successful verification.
- Official instructions: https://docs.pingcap.com/tidbcloud/create-tidb-cluster-serverless/ ; https://docs.pingcap.com/tidbcloud/serverless-limitations/ ; https://vercel.com/docs/functions/configuring-functions/region

## TiDB provisioning reported — 2026-11-13
- User reports instance aektaphong-portfolio, ID 10963559494460172536, Starter / MySQL Compatible / AWS ap-southeast-1, status Creating. Spending limit 0 requested earlier but not shown in supplied instance details; confirm in console before proceeding.
- Added vercel.json with one Functions region sin1 to match confirmed database region. JSON syntax and region value checked; applies on next deployment, no deployment performed.
- Pending: wait for ready/available instance; user verifies spending limit 0, then opens Connect for secure credential entry. Do not paste connection strings/passwords in chat. No credentials available, no TLS or DB compatibility tests/seed performed yet. Existing 17 certificates/data/assets unchanged; jbm-pro-auto untouched.

## Static export complete — 2026-11-13 (supersedes DB deployment plan)
- User switched scope to static export, no DB/API/Docker in build or runtime, NO deployment. TiDB connection/seed work stopped; no password input or remote DB connection was performed by this task.
- Source of public data: existing data/certificates.json (17 unique IDs), data/projects.json (2 projects), corroborated by qa/certificate-ZHTRAWT/results.json total 17. JSON files remain byte-identical to pre-change backup. Featured IDs remain CG5XUW6, 283NVKV, NHKBXZW; order unchanged. 4HVOPCH remains PNG-only (PDF missing).
- next.config.ts output export + trailingSlash + unoptimized images; lib/data.ts replaces DB access, dynamic route flags removed. Existing img components and CSS unchanged. data/site.json replaces optional RESUME_PATH (empty as before). NavigationLink uses normal anchors to avoid observed static RSC segment 404s with this Next version.
- DB/API/schema/seed/TLS helper/Docker/start configuration and local env files archived outside workspace at D:/Aektaphong_portfolio_archive/2026-11-13-before-static-123504. No DB, volume, or earlier backup deleted. Build cache with stale removed API types moved to qa/next-cache-before-static (excluded from upload).
- Removed mysql2, dotenv, @vercel/functions, server-only from package/lock and node_modules. Removed obsolete API validation/tests. .env.example now documents no env required; scripts/start replaced by scripts/serve-static.mjs (local output preview only). README rewritten for static usage/documents; out excluded from source upload and Git; deployment output remains out.
- Vercel: ONLY aektaphong-portfolio updated, Next.js, root ., Node 24.x, npm ci / npm run build, Output out. All 7 obsolete DB env entries removed from this project's Preview/Production; env ls confirms none. vercel.json no Functions region. jbm-pro-auto untouched. No deploy.
- Verification: production static build without .env files or DB-related process env passed; lint/typecheck/remaining asset-path unit test passed. Initial stale generated API type failure resolved by archiving build cache. Initial E2E caught static Next prefetch 404s; direct anchors fixed them and rerun passed.
- Final static HTTP E2E: 177 checks, 8 page/viewport cases, both pages direct load + reload, 320/390/768/1440 portrait, keyboard menu/navigation, no-JS links, PDFs/image fallback open/download and byte hashes, no automatic PDF loads, no console/page/asset 404 errors. Evidence qa/static-export/results.json and screenshots. No broad legacy DB tests run.
- Integrity checks: all 40 public asset files byte-identical; JSON unchanged; exact-case certificate paths valid; out contains no API, .env, QA, or legacy-static. Evidence qa/verify-static.cjs and qa/static-assets-before.json. Local static preview currently http://127.0.0.1:3002/.
- Dependency install reported 7 moderate audit findings; no automatic unrelated dependency upgrades applied. No claim of remote Vercel deployment/runtime tests, fresh DB count, or a new certificate PDF review. Missing PDF remains 4HVOPCH; optional real resume still absent. Future deploy is a separate authorization step per latest request.
