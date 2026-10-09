import path from "node:path";
import { fileURLToPath } from "node:url";
import { StaticFileCache } from "../node_modules/vinext/dist/server/static-file-cache.js";
import { startProdServer } from "../node_modules/vinext/dist/server/prod-server.js";

// vinext 0.0.50 caches native Windows paths; browser asset URLs use slashes.
// Normalize the cache once at startup, preserving the server's lookup guards.
if (process.platform === "win32") {
  const createCache = StaticFileCache.create.bind(StaticFileCache);
  StaticFileCache.create = async (...args) => {
    const cache = await createCache(...args);
    cache.entries = new Map(
      [...cache.entries].map(([key, entry]) => [key.replaceAll("\\", "/"), entry]),
    );
    return cache;
  };
}

const portIndex = process.argv.indexOf("--port");
const port = Number(portIndex >= 0 ? process.argv[portIndex + 1] : process.env.PORT ?? 8002);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("Specify a valid port between 1 and 65535.");
}
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(projectRoot);
await startProdServer({ port, host: "0.0.0.0", outDir: path.join(projectRoot, "dist") });
