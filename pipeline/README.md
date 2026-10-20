# Versioned shared pipeline source

This directory is a source mirror of the portable `AI_Index/pipeline` implementation in OneDrive. Runtime adapters currently execute the shared-folder copy. Keep the copies identical when editing pipeline logic; this mirror provides Git history and a recovery source, not a second independent data store.

Raw Bloomberg workbooks, source datasets, research inputs, credentials, run logs and environments are not included here. Provision the private shared folder separately, then set `AI_INDEX_DATA_ROOT` if discovery is ambiguous. Requirements are in `requirements.txt`. Runtime registry and output allowlist snapshots are under `config/`; install these into the shared root's `data/` directory when recovering a data workspace.

To restore code on another machine, copy this directory's code into the provisioned shared root's `pipeline/` directory, excluding this README and `config/` if desired. Review changes before replacing an existing installation. Application commands and actual/estimate methodology are documented in `../docs/DATA_PIPELINE.md`.
