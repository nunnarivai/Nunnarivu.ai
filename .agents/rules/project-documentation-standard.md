---
trigger: always_on
---

# Mandatory External Project Documentation Standard (Nunnarivu.ai)

For **every** development task in `D:\Nunnarivu.ai` — whether small or large, visual or non-visual, and even if documentation is not explicitly mentioned in the prompt — automatically follow the permanent external documentation standard located at:

`D:\Project-History\PROJECT_DOCUMENTATION_STANDARD.md`

## Non-Negotiable Rules

1. **External Storage Only (`D:\Project-History\Nunnarivu.ai\`):**
   - Store all Master Reports (`Master-Report\`), Daily Work Reports (`Daily-Reports\`), Before/After/Desktop/Mobile/Navigation/Video screenshots (`Before-After-Screenshots\YYYY-MM-DD\`), Evidence Indexes (`Evidence-Index\`), Testing Reports (`Testing-Reports\`), and Historical Archives (`Archives\`) strictly under `D:\Project-History\Nunnarivu.ai\`.
   - **NEVER** create management Word/PDF reports, daily work reports, date-wise development history reports, or historical screenshot collections inside `D:\Nunnarivu.ai` (including `docs/project-history/`), production builds, public assets, or remote Git commits.
   - If `D:` is unavailable or lacks space, report the blocker — never silently store project history inside the source repository.
2. **Before Editing:** Record the date (IST), Git checkpoint (`git rev-parse --short HEAD`), and capture authentic BEFORE screenshots into `D:\Project-History\Nunnarivu.ai\Before-After-Screenshots\YYYY-MM-DD\Before\` (or sanitized logs/diffs for non-visual changes).
3. **After Implementation & Verification:** Run actual build, lint, TypeScript, responsive, navigation, and regression checks; capture authentic AFTER evidence; append sequential `NN-XXX` entries to the external Cumulative Master Report (`.docx` + matching `.pdf` with updated TOC), update today's single external Daily Work Report (`.docx`), and update the external Evidence Index.
4. **Hygiene & Git Safety:** Never record credentials, secrets, private keys, or personal data. Never fabricate test passes or screenshots. Never commit, push, rewrite Git history, or deploy without explicit user authorization.
5. **Definition of Done:** Do not mark a task complete until implementation, verification, and external documentation updates are all finished.
