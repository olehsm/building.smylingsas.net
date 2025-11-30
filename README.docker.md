# Docker: build & run the site

This repository includes a `Dockerfile` that builds the site (Hugo + Pagefind) inside a builder image and produces a small nginx-based runtime image.

The image is multi-arch friendly: at build time the Dockerfile detects the container's CPU architecture and downloads a matching Hugo Extended binary (x86_64, arm64, armv7/armv6). That makes it suitable for running on Raspberry Pi as well as standard servers.

Quick start (build and run):

```bash
# build the image (run where this repo is checked out)
docker build -t smylingsas-site .

# run the image and expose on host port 8080
docker run --rm -p 8080:80 smylingsas-site
```

Open http://localhost:8080 (or the Pi's IP) in your browser.

Notes and tips
-------------
- The Dockerfile performs the full static build (Hugo + Pagefind). That means `docker build` may take a few minutes the first time.
- If you want to run directly on a Raspberry Pi, build the image on the Pi itself (or use a CI that builds for ARM). The Dockerfile automatically downloads an ARM build of Hugo when it detects an ARM architecture.
- If you prefer not to download Hugo during image build, you can pre-install Hugo on the host and modify the Dockerfile accordingly.

Dev workflow (fast iteration)
----------------------------
For iterative development (live reload) you can run Hugo locally without a container, or create a dev container that mounts the source directory and runs `hugo server -D`.

Example (local dev):

```bash
cd building.smylingsas.net
npm install
npm start   # runs `hugo server` (live reload)
```

Security and maintenance
------------------------
- The Dockerfile downloads the Hugo release tarball from GitHub at build-time — if you want stricter security, consider adding checksum verification (pin SHA256) or using a curated base image where Hugo is preinstalled.
- The builder stage uses Debian (Node) for ease of building; the runtime uses a lightweight nginx image.

If you want me to add a `Dockerfile.dev` (mounts the repo and runs `hugo server` for faster iteration) or a `docker-compose.dev.yml` for convenience, tell me and I’ll add them.

Questions or changes
--------------------
- Want a pinned Hugo version or checksum added into the repo? I can add `.hugo-version` and `.hugo-sha256` and wire the Dockerfile to use them.
- Want the runtime image to use a different webserver or extra headers for caching/redirects? Tell me which features you need.
W