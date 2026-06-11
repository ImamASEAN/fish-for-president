import { readFileSync } from "fs";
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

    // Try to read the file
    let fileContent;
    try {
      fileContent = readFileSync(filePath, "utf-8");
    } catch (err) {
      // Try index.html for directory requests
      if (requestedPath.endsWith("/") || !extname(requestedPath)) {
        try {
          fileContent = readFileSync(join(filePath, "index.html"), "utf-8");
          res.setHeader("Content-Type", contentTypes[".html"]);
          res.status(200).end(fileContent);
          return;
        } catch {
          res.status(404).end("Not found");
          return;
        }
      }
      res.status(404).end("Not found");
      return;
    }

    // Set content type
    const ext = extname(filePath);
    const contentType = contentTypes[ext] || "application/octet-stream";
    
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).end(fileContent);

  } catch (err) {
    console.error("Error:", err);
    res.status(500).end("Internal Server Error");
  }
}
