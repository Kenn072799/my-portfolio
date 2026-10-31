# Repository security review

This review covers accidental disclosure through Git, checked-in configuration, the generated frontend bundle, and installed npm dependencies. It is not a live penetration test. No credentials are printed in scan reports.

## Changes applied

- Added repository-wide ignore rules for environment files, private keys, local backend settings, IDE state, database exports, build output, and dependencies. Safe `.env.example` templates remain allowed.
- Removed 13 previously tracked local artifacts from Git's index: Visual Studio caches and Copilot state, the project user file, and the local HTTP request file. Their working copies remain on disk. These removals are staged.
- Added pre-commit and pre-push hooks, enabled for this checkout through `core.hooksPath=.githooks`. A local Node runtime path is configured as a fallback; it is not stored in tracked source.
- The commit hook inspects the staged blob, not just the current file. The push hook checks outgoing Git objects, including intermediate commits where a secret was later deleted. Both block known credential patterns and local-only file paths.
- Added detection for reintroducing private admin/provider secrets through frontend environment references.
- Added a generated-bundle secret scan through `npm run build`'s `postbuild` step, plus `npm run security:check`.
- Expanded Docker exclusions for environment-specific settings, environment files, and key files.
- Corrected the README's unsafe instruction to configure an admin secret as a frontend Vite variable. Admin secrets belong on the backend and are entered through the admin login.
- Applied compatible dependency security fixes without forced major upgrades or package install scripts.

## Results

- Current tracked/unignored working files: no detected secret-pattern or forbidden-file findings after cleanup.
- Staged guard files: scanned separately before handoff.
- Existing history: 24 reachable commits and 242 unique reachable file objects reviewed. No active-looking credential values were detected by these rules. Two historical frontend files reference a private admin key through a public Vite variable; the current working versions remove those references.
- Previously committed IDE artifacts remain in older history. Staging their removal does not purge historical copies. No history was rewritten.
- Generated production bundle: no detected secret patterns.
- npm audit before fixes: 25 affected-package findings, including 14 high-severity findings.
- npm audit after compatible fixes: zero high or critical findings; six moderate package findings remain, all development-only ESLint/minimatch dependencies. npm reports no compatible fix under the current toolchain constraints. No forced major upgrade was applied.
- Automated tests verify redaction, placeholder handling, forbidden paths, staged-secret detection, actual Git hooks, secrets in intermediate outgoing commits, and generated-bundle detection. Fixtures use synthetic credentials in a temporary repository.

## Actions before publishing

1. Rotate the admin key previously configured as `VITE_ADMIN_API_KEY` and shared in this conversation. Remove that variable from frontend deployment settings. Update the backend's `AdminApiKey`, then use the new key at admin login. Ignoring a local environment file does not make a referenced frontend Vite value private.
2. Review the staged artifact removals and guard files. The portfolio application changes and dependency lockfile still require your normal review and staging; nothing has been committed or pushed by this review.
3. Enable GitHub secret scanning/push protection where available. Local hooks can be bypassed or absent in a fresh clone. GitHub's built-in detectors do not guarantee detection of a custom admin-key format.
4. If the old IDE/Copilot history contains private material you want removed, plan a separate history cleanup with any collaborators. Removing files in a new commit does not erase older commits. Rotate exposed credentials regardless of later cleanup.
5. Plan a compatible ESLint-toolchain update for the six remaining moderate development findings. Runtime dependency fixes are already applied.

## Commands

From the repository root:

```sh
node scripts/security-scan.mjs --worktree
node scripts/security-scan.mjs --staged
node scripts/security-scan.mjs --history
node scripts/security-scan.mjs --bundle
node --test scripts/security-scan.test.mjs
git diff --cached --stat
```

From the frontend directory:

```sh
npm run security:check
npm run lint
npm run typecheck
npm run build
```

For another clone, install Node.js and enable the tracked hooks:

```sh
git config core.hooksPath .githooks
```

Hook files are tracked as executable with LF line endings. The scanner exits with a failure if it cannot inspect the selected Git objects. Patterns are a practical guard against common accidental leaks, not a guarantee that arbitrary or encrypted secrets will be identified.

## Additional backend observations

- The existing server checks `X-Api-Key` for admin writes, analytics, and visitor-list access. Editing the browser's session flag only changes frontend routing; it does not replace server authorization.
- The public chatbot has an existing server-side request-length limit and rate limiter. The public visitor-tracking endpoint has no equivalent rate limiter in the checked-in code and manually accepts forwarded IP headers; review rate limiting and trusted-proxy handling before relying on those values.
- The existing backend applies database migrations on startup. This review did not start the backend or touch the database.
- .NET dependency advisories and live production security headers were not assessed by the npm checks.

References: [Vite environment variable security](https://vite.dev/guide/env-and-mode#security-notes), [GitHub command-line push protection](https://docs.github.com/en/code-security/concepts/secret-security/command-line-push-protection).
