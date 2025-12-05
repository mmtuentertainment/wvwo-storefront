# Astro Development Container
# Node.js 22 LTS (Jod) on Alpine for lightweight WV Wild Outdoors frontend
# Updated: December 2025

FROM node:22-alpine

# Install system dependencies
# Note: Not pinning apk versions - Alpine rotates packages frequently
RUN apk add --no-cache \
    git \
    curl

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S astro -u 1001 -G nodejs

# Set working directory
WORKDIR /app

# Install pnpm 9.x (faster than npm)
RUN npm install -g pnpm@9

# Copy package files first (for layer caching)
COPY --chown=astro:nodejs package*.json ./
COPY --chown=astro:nodejs pnpm-lock.yaml* ./

# Install dependencies
RUN if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
    else npm ci; fi

# Copy application source
COPY --chown=astro:nodejs . .

# Set timezone to Eastern (WV)
ENV TZ=America/New_York

# Switch to non-root user
USER astro

# Expose Astro dev server port
EXPOSE 3000

# Health check - verify dev server is responding
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1

# Run Astro dev server with host binding for Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]

# Notes:
# - Host binding (0.0.0.0) required for Docker port mapping
# - Hot reload works via bind mounts in docker-compose.yml
# - Build output goes to /app/dist for production builds
