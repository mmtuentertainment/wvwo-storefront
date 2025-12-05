# Directus 11 - Headless CMS for WV Wild Outdoors
# Based on official Directus image with custom extensions support
# Updated: December 2025 - New policies-based access control system

FROM directus/directus:11

# Set working directory
WORKDIR /directus

# Install any additional Node dependencies needed for custom extensions
# RUN pnpm install <package-name>

# Copy custom extensions (if any)
# COPY extensions/ /directus/extensions/

# Set timezone to Eastern (WV)
ENV TZ=America/New_York

# Expose Directus port
EXPOSE 8055

# Health check - verify Directus API is responding
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:8055/server/health || exit 1

# Use default Directus entrypoint (runs as node user by default)
# Environment variables configured via docker-compose.yml
