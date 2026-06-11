import { readFileSync, existsSync, statSync } from "fs";
import { extname, join, normalize } from "path";

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

export default function handler(req, res) {
  try {
    // Decode URL and get requested path
    const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;
    const requestedPath = pathname === "/" ? "index.html" : pathname.slice(1);
    
    // Security: prevent directory traversal
    const filePath = normalize(join(process.cwd(), requestedPath));
    const projectRoot = normalize(process.cwd());
    
    if (!filePath.startsWith(projectRoot)) {
      res.status(403).end("Forbidden");
      return;
    }

    // Try multiple candidate roots because Vercel serverless may set cwd to /var/task/api
    const candidates = [filePath, normalize(join(process.cwd(), "..", requestedPath))];

    let foundPath = null;
    for (const p of candidates) {
      try {
        if (existsSync(p) && !statSync(p).isDirectory()) {
          foundPath = p;
          break;
        }
      } catch (_) {
        // ignore
      }
    }

    // If directory or no ext, try index.html in candidate directories
    if (!foundPath) {
      for (const p of candidates) {
        try {
          const idx = join(p, "index.html");
          if (existsSync(idx)) {
            foundPath = idx;
            break;
          }
        } catch (_) {}
      }
    }

    if (!foundPath) {
      res.status(404).end("Not found");
      return;
    }

    const ext = extname(foundPath);
    const contentType = contentTypes[ext] || "application/octet-stream";

    // Serve as buffer for binary files
    const isText = [".html", ".css", ".js", ".mjs", ".json", ".svg"].includes(ext);
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=3600");
    if (isText) {
      const fileContent = readFileSync(foundPath, "utf-8");
      res.status(200).end(fileContent);
    } else {
      const fileContent = readFileSync(foundPath);
      res.status(200).end(fileContent);
    }

  } catch (err) {
    console.error("Error:", err);
    res.status(500).end("Internal Server Error");
  }
}
