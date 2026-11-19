# Dashboard synchronization — 19 November 2026

The canonical website in `Projects/AI_Index` now contains the current internal dashboard application, accepted source-date snapshots, methodology v3.4, paired Ramp/OpenRouter charts and OpenRouter stacked model bars. Publishing and internal staging copies retain matching application files and their own hosting configuration. Source collection was not run; synchronization does not advance observation dates.

The shared OneDrive pipeline is mirrored under `pipeline/`, including model-volume generation, spending/pricing collectors, lab absolute-level scoring, independent hardware baselines, refresh commands and database import/export code. UI installation adapters match the application, and configuration mirrors match accepted shared configuration. Credentials, raw workbooks, downloaded archives and dependencies are excluded.

Validation: canonical production build passed; the current local page and stylesheets passed HTTP checks; all 14 selected website checks passed; all 48 selected pipeline regressions passed in the provisioned shared-data workspace. Mirrored pipeline source was compared byte for byte. Pipeline tests needing private baseline fixtures require that workspace. Older tests asserting retired methodology versions and wording remain historical and were not represented as a passing full suite.

The canonical local server is `http://localhost:8000/`. The internal deployment remains at `http://GT-HKBEELNK-012:8080/ai_index/`. This GitHub source synchronization does not republish the hosted public Site.
