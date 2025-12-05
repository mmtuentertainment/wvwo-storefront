# Ghost 6 Blog for WV Wild Outdoors
# Using official image with SQLite (PostgreSQL no longer supported by Ghost)
# Updated: December 2025

FROM ghost:6-alpine

# Set timezone to Eastern (WV)
ENV TZ=America/New_York

# Expose Ghost port
EXPOSE 2368

# Use default Ghost entrypoint
# SQLite database configured via environment variables in docker-compose.yml
# Note: Ghost dropped PostgreSQL support - using SQLite for local development
# Ghost 6.0+ features: Social Web integration, native analytics
