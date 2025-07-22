#!/bin/bash

# Cinco Doce Website - Local Development Setup Script
# This script sets up the development environment and starts the local server

echo "🚀 Setting up Cinco Doce Website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Please run this script from the project root directory (where index.html is located)"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the development server
echo "🌐 Starting development server on http://localhost:3000..."
echo "✨ Features enabled:"
echo "   - Smooth scrolling with Lenis.js"
echo "   - Three.js particle system"
echo "   - GSAP scroll animations"
echo "   - Local asset hosting (no CORS issues)"
echo ""
echo "🛑 Press Ctrl+C to stop the server"
echo ""

npm run dev
