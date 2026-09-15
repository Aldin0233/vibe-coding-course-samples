import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist/client');
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.png':'image/png', '.webp':'image/webp', '.gif':'image/gif', '.svg':'image/svg+xml', '.woff2':'font/woff2' };
createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/vibe-coding-course-samples(?=\/|$)/, '') || '/';
    let file = resolve(root, '.' + path);
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    try { if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html'); } catch { if (!extname(file)) file += '.html'; }
    const content = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store' }).end(content);
  } catch { res.writeHead(404).end('Not found'); }
}).listen(3000, () => console.log('Guide preview: http://localhost:3000/'));