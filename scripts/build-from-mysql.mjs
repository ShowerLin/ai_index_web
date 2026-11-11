import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const [dataProject, envFile, mode] = process.argv.slice(2);
if (!dataProject || !envFile || (mode && mode !== "--refresh")) {
  console.error("Usage: npm run build:mysql -- <data-project-folder> <mysql-env-file> [--refresh]");
  process.exit(1);
}
const python = process.env.PYTHON || (process.platform === "win32" ? "python" : "python3");
const temporary = mkdtempSync(join(tmpdir(), "ai-index-mysql-"));
try {
  const runArgs = [];
  if (mode === "--refresh") {
    const receipt = join(temporary, "imported-run");
    const refresh = spawnSync(python, [
      resolve(dataProject, "pipeline/import_dashboard.py"),
      "--data-root", resolve(dataProject),
      "--env-file", resolve(envFile),
      "--web-root", process.cwd(),
      "--rebuild", "--run-id-file", receipt,
    ], { stdio: "inherit" });
    if (refresh.error) throw refresh.error;
    if (refresh.status !== 0) throw new Error("Dashboard refresh failed before website build.");
    runArgs.push("--run-id", readFileSync(receipt, "ascii"));
  }
  const exportResult = spawnSync(python, [
    resolve(dataProject, "pipeline/export_dashboard_db.py"),
    "--env-file", resolve(envFile),
    "--output", temporary,
    ...runArgs,
  ], { stdio: "inherit" });
  if (exportResult.error) throw exportResult.error;
  if (exportResult.status !== 0) {
    process.exitCode = exportResult.status ?? 1;
  } else {
    const build = spawnSync(process.execPath, ["node_modules/vinext/dist/cli.js", "build"], {
      stdio: "inherit",
      env: { ...process.env, AI_INDEX_BUILD_DATA: temporary },
    });
    if (build.error) throw build.error;
    process.exitCode = build.status ?? 1;
  }
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
