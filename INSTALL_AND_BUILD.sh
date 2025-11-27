#!/bin/bash

echo "🚀 Installing optimized dependencies..."
echo ""

# Clean old files
rm -rf node_modules package-lock.json

# Install (much faster now - only 11 packages!)
npm install

echo ""
echo "✅ Installation complete!"
echo ""
echo "📦 Building optimized app..."
echo ""

# Build
npm run build

echo ""
echo "✅ Build complete!"
echo ""
echo "🎉 Your app is now optimized and ready!"
echo ""
echo "To start: npm run dev"
