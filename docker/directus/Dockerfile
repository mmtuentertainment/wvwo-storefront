# Directus 10 - Headless CMS for WV Wild Outdoors
# Based on official Directus image with custom extensions support

FROM directus/directus:10

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

# Use default Directus entrypoint
# Environment variables configured via docker-compose.yml
