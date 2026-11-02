import { createReadStream, stat } from "node:fs";
import { createServer } from "node:http";
import { extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const port = Number(process.env.MNI_PREVIEW_PORT || 8002);
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".woff2": "font/woff2",
};

const server = createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }

  if (pathname.includes("\0")) {
    response.writeHead(400).end("Bad request");
    return;
  }

  const requestedPath = pathname.endsWith("/") ? join(pathname, "index.html") : pathname;
  const filePath = resolve(appRoot, `.${sep}${requestedPath}`);
  const pathFromRoot = relative(appRoot, filePath);
  if (pathFromRoot === ".." || pathFromRoot.startsWith(`..${sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  stat(filePath, (error, info) => {
    if (error || !info.isFile()) {
      response.writeHead(404).end("Not found");
      return;
    }

    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Length": info.size,
      "Content-Type": contentTypes[extname(filePath).toLowerCase()] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    createReadStream(filePath).pipe(response);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`MNI Gudang & Logistik preview: http://localhost:${port}/`);
  console.log(`Serving local files from ${appRoot}`);
});
