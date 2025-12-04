# Mixpost - Social Media Management for WV Wild Outdoors
# Laravel-based application for scheduling social posts

FROM php:8.2.14-fpm-alpine3.19

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    nginx \
    supervisor \
    postgresql-dev

# Install PHP extensions
RUN docker-php-ext-install \
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

# Default command (override in docker-compose if needed)
CMD ["php-fpm"]

# Notes:
# - This is a base Dockerfile for Mixpost
# - May need adjustment based on actual Mixpost installation method
# - Consider using official inovector/mixpost image instead
