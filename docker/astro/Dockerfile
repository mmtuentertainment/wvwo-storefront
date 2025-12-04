# Astro Development Container
# Node.js 18 on Alpine for lightweight WV Wild Outdoors frontend

FROM node:18-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl

# Set working directory
WORKDIR /app

# Install pnpm (faster than npm)
RUN npm install -g pnpm

# Copy package files first (for layer caching)
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install dependencies
RUN if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
    else npm ci; fi

# Copy application source
COPY . .

# Set timezone to Eastern (WV)
ENV TZ=America/New_York

# Expose Astro dev server port
EXPOSE 3000

# Run Astro dev server with host binding for Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]

# Notes:
# - Host binding (0.0.0.0) required for Docker port mapping
# - Hot reload works via bind mounts in docker-compose.yml
# - Build output goes to /app/dist for production builds
