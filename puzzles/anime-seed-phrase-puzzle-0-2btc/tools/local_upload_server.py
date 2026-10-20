# -*- coding: utf-8 -*-
"""Local one-shot upload endpoint.

The desktop browser can reach the internet where host curl cannot; this server
lets page JS POST fetched bytes back to the host filesystem.

Usage: python tools/local_upload_server.py <outdir> [port]
POST /upload?name=foo.png  (body = raw bytes) -> writes <outdir>/foo.png
GET  /ping -> "ok"
"""
import os
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs

OUTDIR = os.path.abspath(sys.argv[1])
PORT = int(sys.argv[2]) if len(sys.argv) > 2 else 8765
os.makedirs(OUTDIR, exist_ok=True)


class H(BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_GET(self):
        self.send_response(200)
        self._cors()
        self.send_header("Content-Type", "text/plain")
        self.end_headers()
        self.wfile.write(b"ok")

    def do_POST(self):
        u = urlparse(self.path)
        name = os.path.basename(parse_qs(u.query).get("name", ["upload.bin"])[0])
        n = int(self.headers.get("Content-Length", "0"))
        data = self.rfile.read(n)
        path = os.path.join(OUTDIR, name)
        with open(path, "wb") as f:
            f.write(data)
        print("WROTE", path, len(data), flush=True)
        self.send_response(200)
        self._cors()
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(('{"path":%r,"size":%d}' % (path, len(data))).replace("'", '"').encode())

    def log_message(self, *a):
        pass


if __name__ == "__main__":
    print("serving on", PORT, "->", OUTDIR, flush=True)
    HTTPServer(("127.0.0.1", PORT), H).serve_forever()
