# PostgreSQL 15 with Alpine Linux
# Optimized for WV Wild Outdoors local development

FROM postgres:15-alpine

# Install PostgreSQL extensions commonly needed
RUN apk add --no-cache \
    postgresql-contrib

# Copy initialization scripts
COPY init-scripts/ /docker-entrypoint-initdb.d/

# Set timezone to Eastern (WV)
ENV TZ=America/New_York

# Expose standard PostgreSQL port
EXPOSE 5432

# Use default postgres entrypoint
# Initialization scripts in /docker-entrypoint-initdb.d/ run automatically on first start
