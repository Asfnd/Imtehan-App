#!/bin/bash

echo "🔄 Restoring original state and building..."

# Remove node_modules and caches
rm -rf node_modules package-lock.json .next tsconfig.tsbuildinfo

# Install all dependencies
echo "📦 Installing dependencies..."
npm install

# Clear Next.js cache
echo "🧹 Clearing Next.js cache..."
rm -rf .next

# Build
echo "🏗️  Building..."
npm run build

echo "✅ Done! If successful, run: npm run dev"
