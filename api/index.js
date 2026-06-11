import { readFileSync, existsSync, statSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, extname, join, normalize } from "path";

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp"
};

const currentDir = dirname(fileURLToPath(import.meta.url));

function findFile(requestedPath) {
  const searchDirs = new Set();
  let cursor = currentDir;

  for (let i = 0; i < 8; i += 1) {
    searchDirs.add(normalize(cursor));
    cursor = dirname(cursor);
  }
  searchDirs.add(normalize(process.cwd()));
  searchDirs.add(normalize(join(process.cwd(), "..")));

  for (const dir of searchDirs) {
    const candidate = normalize(join(dir, requestedPath));
    if (existsSync(candidate) && !statSync(candidate).isDirectory()) {
      return candidate;
    }
  }

  for (const dir of searchDirs) {
    const candidate = normalize(join(dir, requestedPath, "index.html"));
    if (existsSync(candidate) && !statSync(candidate).isDirectory()) {
      return candidate;
    }
  }

  return null;
}

export default function handler(req, res) {
  try {
    const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;
    const requestedPath = pathname === "/" ? "index.html" : pathname.slice(1);

    const foundPath = findFile(requestedPath);
    if (!foundPath) {
      res.status(404).end("Not found");
      return;
    }

    const ext = extname(foundPath);
    const contentType = contentTypes[ext] || "application/octet-stream";
    const isText = [".html", ".css", ".js", ".mjs", ".json", ".svg"].includes(ext);

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=3600");

    if (isText) {
      res.status(200).end(readFileSync(foundPath, "utf-8"));
    } else {
      res.status(200).end(readFileSync(foundPath));
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).end("Internal Server Error");
  }
}
