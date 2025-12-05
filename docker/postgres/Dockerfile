# PostgreSQL 17 with Alpine Linux
# Optimized for WV Wild Outdoors local development
# Updated: December 2025

FROM postgres:17-alpine

# Install PostgreSQL extensions commonly needed
# Note: Not pinning apk versions - Alpine rotates packages frequently
# and the postgres base image is already version-locked
RUN apk add --no-cache \
    postgresql-contrib

# Copy initialization scripts
COPY init-scripts/ /docker-entrypoint-initdb.d/

# Set timezone to Eastern (WV)
ENV TZ=America/New_York

# Expose standard PostgreSQL port
EXPOSE 5432

# Health check - verify PostgreSQL is accepting connections
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD pg_isready -U postgres || exit 1

# Use default postgres entrypoint (runs as postgres user by default)
# Initialization scripts in /docker-entrypoint-initdb.d/ run automatically on first start
