#!/usr/bin/env bash
# Docker cleanup script for WV Wild Outdoors

echo "==================================================================="
echo "  Docker Cleanup - WV Wild Outdoors"
echo "==================================================================="
echo ""

echo "Current disk usage:"
docker system df
echo ""

# Stop non-WVWO containers
echo "Stopping extra containers (MCP servers)..."
docker stop tender_jepsen adoring_keldysh 2>/dev/null || true
docker rm tender_jepsen adoring_keldysh 2>/dev/null || true

# Remove old/unused images
echo "Removing old unused images..."
docker rmi postgres:15-alpine 2>/dev/null || true
docker rmi redis:7-alpine 2>/dev/null || true
docker rmi directus/directus:10 2>/dev/null || true
docker rmi ghost:5.96.0 2>/dev/null || true
docker rmi ghost:5-alpine 2>/dev/null || true
docker rmi inovector/mixpost:latest 2>/dev/null || true

# Clean build cache
echo "Cleaning build cache..."
docker builder prune -f

# Clean dangling images
echo "Removing dangling images..."
docker image prune -f

echo ""
echo "Cleanup complete! New disk usage:"
docker system df
