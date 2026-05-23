FROM node:22

# Install basic development tools
RUN apt update && apt install -y less man-db sudo

# Ensure default `node` user has access to `sudo`
ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Install Hugo extended
ARG HUGO_VERSION=0.145.0
RUN ARCH=$(dpkg --print-architecture) && \
    curl -fsSL "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-${ARCH}.deb" -o /tmp/hugo.deb && \
    dpkg -i /tmp/hugo.deb && \
    rm /tmp/hugo.deb

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true
