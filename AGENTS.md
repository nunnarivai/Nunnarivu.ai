# Nunnarivu.ai — Workspace Agent Instructions

## Mandatory External Documentation Lifecycle

Every development task in `D:\Nunnarivu.ai` MUST automatically follow the permanent external documentation standard stored at `D:\Project-History\PROJECT_DOCUMENTATION_STANDARD.md` (enforced via `.agents/rules/project-documentation-standard.md`), even when documentation is not explicitly requested in the prompt.

- **External Root Only:** All project history, management Word/PDF reports, daily work reports, before/after screenshots, testing evidence, and archives MUST be saved strictly outside this repository under `D:\Project-History\Nunnarivu.ai\`.
- **Never Inside Source Repo:** Do NOT create management reports, daily reports, date-wise history documents, or historical screenshot collections inside `D:\Nunnarivu.ai`, `docs/project-history/`, production builds, or Git commits.
- **Full Task Lifecycle:** Capture authentic BEFORE evidence and Git checkpoint prior to editing; run real build/lint/TypeScript/browser QA after editing; capture authentic AFTER evidence; update the external Cumulative Master Report (`.docx` + `.pdf`), today's external Daily Work Report (`.docx`), and the external Evidence Index using sequential `NN-XXX` Change IDs.
- **Security & Git Policy:** Never include secrets, credentials, private keys, or personal data in any documentation. Do not commit, push to remote, or deploy without explicit user authorization.
