# PR Review Agent 🔎

A **local self-check** every developer runs on their branch **before raising a PR**,
so we all catch the common issues ourselves instead of a reviewer catching them.

Zero dependencies — just Node (already installed for the frontend).

## Run it

From the **repo root**, with your feature branch checked out:

```bash
node pr-review-agent/review.mjs
```

It compares your branch against `develop`, runs the checks, and prints a report.

### Options

```bash
node pr-review-agent/review.mjs main         # compare against a different base branch
node pr-review-agent/review.mjs --skip-build # skip the production build (faster)
node pr-review-agent/review.mjs --skip-lint  # skip ESLint
```

Exit code is **1** if any errors are found (handy for git hooks / CI), **0** otherwise.

## What it checks (only your changed files)

**Errors (must fix):**
- **Merge conflict markers** left in files (`<<<<<<<`, `=======`, `>>>>>>>`)
- **Stale design tokens** — `text-text`, `text-text-h`, `*-brand-*` (removed by the design system). Use `text-foreground`, `text-muted-foreground`, `text-accent`, `text-primary`, `bg-primary`, …
- **`debugger`** statements
- **Large binaries** (> 3 MB) committed to git — host media externally / use Git LFS
- **ESLint** problems on changed source files
- **Production build** failure (`npm run build`)

**Warnings (review, usually fix):**
- **Hardcoded palette colors** (`bg-orange-500`, `text-gray-400`, …) — prefer semantic tokens
- **Hardcoded hex** colors in `className`/`style`
- **`console.log` / `console.debug`** left in code
- **Deep relative imports** (`../../../…`) — use the `@/…` alias (see `frontend/AGENT.md`)
- **`axios` imported outside a service** — only services should use axios
- **Large assets** (> 1 MB, or media > 300 KB)
- **`package-lock.json` changed** without `package.json` (accidental lockfile churn)

## Recommended workflow

```bash
# after finishing your work, before you push / open the PR:
node pr-review-agent/review.mjs
# fix any ✗ errors, glance at the ! warnings, then raise the PR
```

## Optional: run automatically before every push

Add a git pre-push hook (`.git/hooks/pre-push`, make it executable):

```sh
#!/bin/sh
node pr-review-agent/review.mjs --skip-build || {
  echo "PR Review Agent found issues. Fix them or push with --no-verify."; exit 1;
}
```

## Production / CI (the enforced layer)

Running the agent locally is optional — a developer can forget. The **enforced**
layer is a GitHub Actions workflow (`.github/workflows/pr-review.yml`) that runs
**automatically on every PR into `develop`**, server-side, and cannot be skipped.

On each PR it:

1. installs deps (`npm ci`),
2. runs this **agent's team-convention checks** on the PR diff,
3. runs **ESLint** on the whole frontend,
4. runs the **production build**.

If any step fails, the check goes red.

### Make it a required gate (repo admin, one-time)

So a red check actually **blocks the merge**, a repo admin enables branch
protection on `develop`:

> **Settings → Branches → Add branch protection rule** for `develop`
> - ✅ Require a pull request before merging (≥ 1 approval)
> - ✅ Require status checks to pass → select **“Lint, build & team checks”**
> - ✅ Require branches to be up to date before merging

After this, a PR can only merge when CI is green **and** a teammate approves.

### Also included

- **`.github/dependabot.yml`** — weekly dependency + security-vulnerability PRs
  for `frontend` (free, zero-maintenance).

### The full picture

| Layer | Where | Enforced? |
|---|---|---|
| This agent (local) | developer's laptop, before push | optional (habit / pre-push hook) |
| This agent + lint + build (CI) | GitHub Actions, every PR | ✅ required via branch protection |
| Human review | GitHub PR | ✅ required (≥ 1 approval) |
| Dependabot | GitHub, weekly | automatic |

### Recommended next steps (to go further)

- Add a **test suite** (Vitest) and run it in CI with coverage — the biggest gap.
- Add **pre-commit hooks** (Husky + lint-staged) so lint/format run on commit.
- Optionally add an **AI reviewer** (CodeRabbit / Copilot) for semantic feedback.

## Notes

- The checks encode our team conventions (design-system tokens + `frontend/AGENT.md`).
  When those evolve, update the patterns in `review.mjs`.
- This is a fast, deterministic gate — not a replacement for a human review, but it
  removes the boring back-and-forth so reviews focus on logic and design.
