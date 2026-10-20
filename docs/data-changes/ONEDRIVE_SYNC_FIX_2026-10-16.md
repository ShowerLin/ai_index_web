> Archived shared-data change record. Paths below are relative to the OneDrive AI_Index data root. For current operation see ../DATA_PIPELINE.md.

# OneDrive reserved folder name fix — 16 October 2026

OneDrive rejected two generated folders named `aux`. `AUX` is a Windows reserved device name and is disallowed by OneDrive regardless of letter case. The earlier pipeline migration introduced this incompatible folder name.

Renamed both folders to `audits`:

- `data/derived/aux` → `data/derived/audits`
- `data/runs/20261015T031217144712Z/build/aux` → the sibling `audits` folder

Updated the useful-task builder, pipeline promotion step and pipeline guide to use `audits` for future runs. Both files in each renamed folder retained identical SHA-256 hashes. A project scan found no remaining Windows reserved device names. The task build passed with no generated snapshot changes.

Local filesystem fixes are verified. OneDrive's final synchronization state was not inspected; the screenshot's badge shows three issues, while this fix addresses the two displayed folder-name issues.

Reference: [Microsoft's OneDrive restrictions](https://support.microsoft.com/en-us/onedrive/restrictions-and-limitations-in-onedrive-and-sharepoint).
