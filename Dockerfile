FROM node:20-bullseye AS builder

# Allow overriding HUGO_VERSION at build time with --build-arg HUGO_VERSION=...
ARG HUGO_VERSION

RUN apt-get update \
	&& apt-get install -y --no-install-recommends ca-certificates wget tar \
  	&& rm -rf /var/lib/apt/lists/*

WORKDIR /src

# Copy repo files and .hugo-version so the Docker build can use the repo-controlled Hugo version
COPY .hugo-version /src/.hugo-version
# Copy the site sources
COPY building.smylingsas.net ./building.smylingsas.net

WORKDIR /src/building.smylingsas.net

# Detect architecture and download the matching Hugo Extended binary
RUN set -eux; \
    ARCH=$(uname -m); \
    case "$ARCH" in \
		x86_64) HUGO_SUFFIX="Linux-64bit" ;; \
      	aarch64|arm64) HUGO_SUFFIX="Linux-ARM64" ;; \
     	 armv7l|armv6l) HUGO_SUFFIX="Linux-ARM-32bit" ;; \
      	*) echo "Unsupported architecture: $ARCH"; exit 1 ;; \
    esac; \
    # Prefer build-arg HUGO_VERSION, otherwise fall back to .hugo-version from repo, then default to 0.145.0
    HUGO_VERSION=${HUGO_VERSION:-$(cat /src/.hugo-version 2>/dev/null || echo "0.145.0")}; \
    echo "Downloading hugo_extended_${HUGO_VERSION}_${HUGO_SUFFIX}.tar.gz for $ARCH"; \
    HUGO_URL="https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_${HUGO_SUFFIX}.tar.gz"; \
    wget -qO /tmp/hugo.tar.gz "$HUGO_URL"; \
    mkdir -p /tmp/hugo && tar -xzf /tmp/hugo.tar.gz -C /tmp/hugo --strip-components=1; \
    ls -l /tmp/hugo/hugo || (echo "hugo not found in archive" && exit 1); \
    cp /tmp/hugo/hugo /usr/local/bin/hugo; chmod +x /usr/local/bin/hugo; \
    /usr/local/bin/hugo version

# Install JS deps and build site (Hugo + Pagefind)
RUN npm ci --no-audit --no-fund && npm run hugo:build


FROM nginx:stable-alpine

# Copy generated public folder from builder
COPY --from=builder /src/building.smylingsas.net/public /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
	CMD wget -qO- --timeout=2 http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]