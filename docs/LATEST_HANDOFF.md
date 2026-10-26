# Latest handoff — 26 October 2026

The application includes Adoption and Monetization updates, the Hyperscalers chapter (cloud/RPO estimates, CapEx, cash funding and returns), Infrastructure stages with grouped orders/imports/GPU-price plots, and the refined navigation. The composite retains Supply v2.8 methodology; research chapter names do not change score weights.

Clone or pull main, install dependencies with pnpm install, and run pnpm dev. Generated application snapshots are committed, so viewing and editing the dashboard does not require the private OneDrive data folder.

For data refreshes, sync the private AI_Index folder separately and set AI_INDEX_DATA_ROOT to it. Git contains the portable pipeline mirror, not raw licensed workbooks or source histories. pipeline/config/source_registry.json and generated_files.json belong under data/; supply_config.json belongs under data/reference/. The archived core-v2.7.ts reference remains in the private shared folder. Do not run adapter installation over an edited website without reviewing its changes.

Build verification: production build passes. Existing unrelated project-wide TypeScript errors are documented in the methodology notes. No hosting deployment is part of this GitHub sync.
