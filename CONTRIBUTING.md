# Contributing to the Unchurn Developer Portal

Thanks for helping improve the Unchurn developer portal.

This repository contains public-facing developer documentation and developer-experience surfaces, so changes must be clear, accurate, accessible, maintainable, and safe to publish.

## Scope of This Repository

This repository owns:

* The developer landing page.
* Fumadocs documentation pages.
* Search and LLM-friendly documentation routes.
* Open Graph image generation for documentation pages.
* Sitemap, robots, and basic public metadata.
* Public developer-facing content and documentation structure.

This repository does not own:

* Production API implementation.
* Secrets or private credentials.
* Customer data.
* Internal-only operational runbooks, unless explicitly approved for public release.
* Unreleased security details.
* Private infrastructure documentation.

## Local Setup

Use Bun as the package manager because this repository tracks `bun.lock`.

```bash
bun install
bun run dev
```

Then open:

```txt
http://localhost:3000
```

Recommended environment:

* Node.js 20 or newer.
* Bun 1.2 or newer.
* Git.
* A GitHub account with 2FA enabled.

Signed commits are encouraged when possible, but they are not currently required unless repository settings are updated.

## Branching Model

The default branch is:

```txt
main
```

Do not push directly to `main`.

All changes must be made in a short-lived branch and submitted through a pull request.

Start from the latest `main`:

```bash
git switch main
git pull origin main
git switch -c docs/short-description
```

Branch naming suggestions:

* `docs/...` for documentation content.
* `ui/...` for landing page or visual changes.
* `fix/...` for bug fixes.
* `chore/...` for tooling and configuration.
* `ci/...` for GitHub Actions and automation.
* `security/...` for private security remediation branches only after disclosure triage.

Do not push work to `master`. This repository uses `main` only.

## Commit Guidelines

Use Conventional Commits.

Examples:

```text
docs: add webhook delivery guide
fix(metadata): fix docs markdown route metadata
refactor(ui): refine developer landing hero
chore(ci): update GitHub Actions workflow
chore(deps): update dependencies
```

Recommended commit types:

* `docs` for documentation content.
* `feat` for new user-facing functionality.
* `fix` for bug fixes.
* `refactor` for code changes that do not change behavior.
* `chore` for maintenance tasks.
* `ci` for GitHub Actions and automation.
* `style` for formatting-only changes.
* `test` for test-related changes.
* `build` for build system or dependency changes.

Recommended scopes:

* `docs`
* `ui`
* `metadata`
* `ci`
* `deps`
* `security`
* `config`

If a commit changes `content/docs` with AI-assisted draft content, make that explicit in the commit body:

```text
Note: content/docs includes AI-generated starter documentation and is expected to change after product review.
```

## Pull Request Requirements

All changes must be submitted through a pull request.

Direct pushes to `main` are not allowed.

Every pull request should include:

* A clear summary of what changed.
* Screenshots for visual changes.
* Links to affected routes, if applicable.
* Validation commands that were run.
* Notes about AI-generated draft content, if any.
* Security considerations if the change touches routes, metadata, dependencies, external links, generated output, or public documentation content.

Recommended PR checklist:

```markdown
## Summary

## Screenshots

## Validation
- [ ] bun run types:check
- [ ] bun run lint
- [ ] bun run build

## Security
- [ ] No secrets or credentials were added
- [ ] No private/internal data was added to docs
- [ ] External links were reviewed
- [ ] Generated routes still expose only public content
- [ ] No unreleased vulnerability details were published
```

## Review Requirements

Pull requests targeting `main` should be reviewed by the repository owner or a member of the Unchurn team before merge.

GitHub's formal required-approval setting is not mandatory for this repository at this time.

Still expected before merge:

* Team review by owner or maintainers.
* All required checks passing.
* No unresolved security concerns.
* No direct push to `main`.

If a pull request changes security-sensitive content, dependencies, generated routes, metadata, or public documentation about authentication, API keys, webhooks, or integrations, reviewers should pay extra attention to what becomes publicly visible.

## Development Standards

### TypeScript

* Keep TypeScript strict-compatible.
* Avoid `any` unless there is a strong reason and a comment explaining it.
* Prefer typed props for React components.
* Keep components focused and composable.
* Avoid unnecessary abstractions.

### React and Next.js

* Use App Router patterns.
* Keep route handlers small and explicit.
* Do not add client components unless interactivity requires it.
* Prefer server components for static documentation and landing content.
* Avoid adding runtime complexity to documentation pages without a clear reason.

### Styling

* Use Tailwind utilities and existing Fumadocs tokens.
* Support dark and light mode.
* Avoid hardcoded colors when a token exists.
* Keep body copy readable in dark mode.
* Avoid glaring white body text.
* Do not add noisy backgrounds, particle effects, or heavy animated gradients to documentation surfaces.
* Prefer subtle, professional visual polish over decorative effects.

### Documentation

Documentation must be:

* Technically accurate.
* Concrete.
* Easy to scan.
* Safe to publish.
* Clear for external developers.

Prefer examples over vague claims.

Do not publish:

* Internal endpoints.
* Private architecture.
* Customer names.
* Credentials.
* Tokens.
* Private URLs.
* Internal incident details.
* Unreleased security details.
* Content that exposes implementation details not intended for public documentation.

Mark unfinished or AI-assisted content clearly in PR descriptions.

Do not manually edit generated `.source` files.

### Dependencies

* Use `bun add` or `bun remove` so `bun.lock` stays in sync.
* Avoid adding dependencies for small UI utilities that can be implemented locally.
* Review dependency licenses and maintenance status before introducing them.
* Treat dependency upgrades as code changes that require validation.
* Dependency updates must pass the same checks as regular code changes.

## Validation Commands

Before opening a pull request, run:

```bash
bun run types:check
bun run lint
bun run build
```

Documentation-only changes must still pass validation because Fumadocs generates typed content sources.

Minimum validation for any change:

```bash
bun run types:check
```

Required checks for pull requests targeting `main`:

```txt
types:check
lint
build
```

If one of these checks fails, fix the issue before requesting review.

## Security Expectations for Contributors

Never commit:

* API keys.
* Access tokens.
* `.env` files.
* Private credentials.
* Private URLs that should not be public.
* Customer data.
* Internal incident details.
* Unreleased vulnerability details.
* Production secrets.
* Personal access tokens.

If you accidentally commit a secret:

1. Stop pushing immediately.
2. Notify a maintainer privately.
3. Rotate the secret before attempting cleanup.
4. Do not open a public issue with the secret value.
5. Do not mention the secret value in commits, issues, discussions, or pull requests.

Security issues must not be reported through public GitHub issues.

Follow the process in `SECURITY.md` or use GitHub private vulnerability reporting if enabled.

## Recommended GitHub Repository Settings

These settings keep the developer portal safe and reliable.

### General

Recommended:

* Default branch: `main`.
* Allow squash merging: enabled.
* Allow merge commits: disabled.
* Allow rebase merging: optional.
* Always suggest updating pull request branches: enabled.
* Allow auto-merge: enabled.
* Automatically delete head branches: enabled.
* Wikis: disabled.
* Issues: enabled.
* Discussions: disabled until there is a clear community need.
* Projects: enabled.
* Pull requests: enabled.
* Sponsorships: disabled.
* Preserve this repository: enabled.
* Include Git LFS objects in archives: disabled unless Git LFS is intentionally used.

### Branch Protection for `main`

The `main` branch must be protected.

Required:

* Pull request before merging.
* Require status checks before merging:

  * `types:check`
  * `lint`
  * `build`
* Require linear history when squash or rebase merging is used.
* Force pushes disabled.
* Branch deletion disabled.
* Branch protection bypass disabled for administrators when possible.

Not currently required:

* Required approvals in GitHub branch protection.
* Dismiss stale approvals.
* Required conversation resolution in GitHub branch protection.
* Signed commits.
* Merge queue.
* Required deployments before merging.
* Code Owners review.

Future recommended settings:

* Require review from Code Owners after `.github/CODEOWNERS` exists.
* Require signed commits after the team has commit signing configured.
* Add required deployments after production and preview deployment environments are fully configured.

### Security and Analysis

Enable:

* Dependency graph.
* Dependabot alerts.
* Dependabot security updates.
* Code scanning with CodeQL.
* Secret scanning.
* Push protection for secrets.
* Private vulnerability reporting, if available for the organization.

### Rulesets

Branch protection rules are currently the primary enforcement mechanism for `main`.

Repository rulesets may be added later to complement branch protection.

A future ruleset for `main` may enforce:

* No direct pushes.
* Pull request required.
* Required status checks.
* Required reviews.
* Block force pushes.
* Block branch deletion.

### Access Control

* Require 2FA for organization members.
* Give write access only to maintainers who need it.
* Prefer teams over individual permissions.
* Review repository collaborators regularly.
* Avoid long-lived personal access tokens.
* Prefer fine-grained tokens when tokens are required.

### Push Protection

If available, limit how many branches and tags can be updated in a single push.

Recommended value:

```txt
5
```

This helps prevent accidental large pushes, mirror pushes, or bulk branch/tag updates.

### Releases and Deployments

If this repository deploys through Vercel or another platform:

* Keep production deploys tied to `main`.
* Use preview deployments for pull requests.
* Store secrets only in the deployment provider, never in the repository.
* Restrict production environment variables to maintainers.
* Review generated public routes before launch.

## Suggested Automation

Add CI workflows for:

* `bun install --frozen-lockfile`.
* `bun run types:check`.
* `bun run lint`.
* `bun run build`.

Add Dependabot for:

* npm package updates.
* GitHub Actions updates if workflows are added.

Recommended Dependabot file:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

Even when using Bun, GitHub Dependabot uses the `npm` ecosystem for `package.json` dependencies.

## Reporting Security Issues

Please do not open public GitHub issues for vulnerabilities.

Use one of the private reporting paths:

* Follow the process in `SECURITY.md`.
* Use GitHub private vulnerability reporting if enabled.

Security reports should include:

* A clear description of the issue.
* Steps to reproduce.
* Affected route, package, component, or document.
* Impact assessment, if known.
* Any relevant logs, screenshots, or proof of concept.

Do not include secrets, tokens, or customer data in public channels.
