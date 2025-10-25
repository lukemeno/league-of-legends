# Contributing Guide

Thank you for your interest in improving the League of Legends analytics
playground! This document describes the expectations for contributors,
maintainers and reviewers.

## Code of Conduct

We follow the [Contributor Covenant](https://www.contributor-covenant.org/)
principles. Treat everyone with respect and kindness. Harassment, discrimination
and toxicity are not tolerated.

## Getting Started

1. Review the [README](README.md) for environment setup instructions.
2. Fork the repository and create a feature branch:
   ```bash
   git checkout -b feature/short-description
   ```
3. Install development dependencies and run the test suite to ensure your local
   environment is working.

## Branching Strategy

- Use short-lived feature branches derived from `main`.
- Prefix branch names with one of:
  - `feature/` for new functionality
  - `fix/` for bug fixes
  - `docs/` for documentation-only changes
  - `chore/` for dependency upgrades or tooling changes
- Rebase frequently on the latest `main` to avoid large merge conflicts.

## Coding Standards

- **Python**: Follow [PEP 8](https://peps.python.org/pep-0008/) and use type
  hints. Prefer `black` for formatting and `ruff` for linting.
- **JavaScript/TypeScript** (future frontend work): Use Prettier formatting and
  ESLint with the project configuration.
- Document public functions and classes with docstrings or JSDoc comments.
- Keep functions focused and write unit tests for new logic.

## Commit Guidelines

- Write clear, imperative commit messages (e.g. `Add match timeline serializer`).
- Group related changes into a single commit; avoid large unrelated diffs.
- Reference relevant issues using the `#123` notation.

## Pull Request Process

1. Ensure the branch is rebased onto `main` and tests pass locally.
2. Update documentation, changelog entries and type hints when relevant.
3. Open a PR with a descriptive title and summary:
   - What change was made
   - Why the change is needed
   - How reviewers can verify the change
4. Link related issues and add screenshots for UI updates.
5. Respond to review feedback promptly. If a change is substantial, consider
   follow-up tickets instead of overloading the PR.
6. A maintainer will merge once approvals and checks are complete.

## Testing Requirements

- Run `pytest` before opening a PR.
- Add regression tests for fixed bugs and coverage for new features.
- For data or configuration changes, provide sample outputs or validation notes.

## Release Management

- `main` is always deployable. Avoid merging experimental work that is not
  feature flagged or otherwise guarded.
- Tag releases following [Semantic Versioning](https://semver.org/).
- Document noteworthy changes in the release notes or changelog.

## Support

If you have questions or need clarification:

- Open a GitHub Discussion topic under **Q&A**.
- Ping maintainers in the project chat channel.
- For urgent issues, email the on-call maintainer (see `CODEOWNERS`).

We appreciate your contributions and enthusiasm for building rich League of
Legends tooling!
