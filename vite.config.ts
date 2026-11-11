import vinext from "vinext";
import { defineConfig } from "vite";
import { readFileSync } from "node:fs";
import { relative, resolve } from "node:path";

const dataRoot = process.env.AI_INDEX_BUILD_DATA;
const databaseFiles = dataRoot
  ? new Set<string>(JSON.parse(readFileSync(resolve(dataRoot, "run.json"), "utf8")).files)
  : new Set<string>();
let loggedDatabaseLoad = false;

export default defineConfig({
  plugins: [{
    name: "ai-index-mysql-data",
    enforce: "pre",
    load(id) {
      const file = relative(process.cwd(), id.split("?")[0]).replaceAll("\\", "/");
      if (dataRoot && databaseFiles.has(file)) {
        if (!loggedDatabaseLoad) {
          console.log(`Using MySQL build data for ${file} and other registered datasets`);
          loggedDatabaseLoad = true;
        }
        return readFileSync(resolve(dataRoot, file), "utf8");
      }
    },
  }, vinext()],
});
