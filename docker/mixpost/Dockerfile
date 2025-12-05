# Mixpost - Social Media Management for WV Wild Outdoors
# Laravel-based application for scheduling social posts
# Updated: December 2025

FROM php:8.4-fpm-alpine

# Install system dependencies and PHP extensions in single layer
# Note: Not pinning apk versions - Alpine rotates packages frequently
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    nginx \
    supervisor \
    postgresql-dev \
    fcgi && \
    docker-php-ext-install \
    pdo \
    pdo_pgsql \
    pgsql \
    gd \
    zip \
    pcntl \
    bcmath

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application files
# Note: In production, clone from Mixpost repository
# For local dev, we'll use the official image or custom setup

# Set timezone to Eastern (WV)
ENV TZ=America/New_York

# Expose port
EXPOSE 8080

# Health check - verify PHP-FPM is responding
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD SCRIPT_NAME=/ping SCRIPT_FILENAME=/ping REQUEST_METHOD=GET cgi-fcgi -bind -connect 127.0.0.1:9000 || exit 1

# Default command (override in docker-compose if needed)
# PHP-FPM runs as www-data user by default
CMD ["php-fpm"]

# Notes:
# - This is a base Dockerfile for Mixpost
# - May need adjustment based on actual Mixpost installation method
# - Consider using official inovector/mixpost image instead
