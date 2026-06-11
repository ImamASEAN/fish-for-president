import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  try {
    const root = process.cwd();
    const entries = readdirSync(root).map(name => {
      const full = join(root, name);
      let info = { name };
      try {
        const s = statSync(full);
        info.isFile = s.isFile();
        info.isDirectory = s.isDirectory();
        info.size = s.size;
      } catch (e) {
        info.error = String(e);
      }
      return info;
    });

    const checks = {
      projectRoot: root,
      hasIndexHtml: entries.some(e => e.name === 'index.html'),
      hasApiIndex: entries.some(e => e.name === 'api')
    };

    res.setHeader('Content-Type', 'application/json');
    res.status(200).end(JSON.stringify({ checks, entries }, null, 2));
  } catch (err) {
    res.status(500).end(JSON.stringify({ error: String(err) }));
  }
}
