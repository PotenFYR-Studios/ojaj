#!/usr/bin/env python3
"""Local preview server for the built docs site (docs/dist).

python3 -m http.server cannot resolve extensionless routes (/about,
/examples, /docs/getting-started) and GitHub Pages cannot rewrite them
either — that is why the build also emits clean-URL directory twins
(<name>/index.html). This server additionally maps an extensionless
request straight to its .html file, so every route style works locally:

    python3 docs/dev-server.py [port]        # default 4180, serves docs/dist
"""

import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent / "dist"


class CleanURLHandler(SimpleHTTPRequestHandler):
    """Serves /<name> from <name>/index.html or <name>.html — no redirects."""

    def translate_path(self, path):
        resolved = super().translate_path(path)
        candidate = Path(resolved)
        if candidate.is_dir():
            # extensionless request: serve the directory index directly
            # instead of redirecting to the trailing-slash form
            if not path.rstrip().endswith("/") and (candidate / "index.html").is_file():
                return str(candidate / "index.html")
            return resolved
        if candidate.exists():
            return resolved
        as_html = Path(resolved + ".html")
        return str(as_html) if as_html.exists() else resolved


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4180
    handler = partial(CleanURLHandler, directory=str(ROOT))
    with ThreadingHTTPServer(("127.0.0.1", port), handler) as httpd:
        print(f"Serving {ROOT} at http://127.0.0.1:{port}/")
        httpd.serve_forever()


if __name__ == "__main__":
    main()
