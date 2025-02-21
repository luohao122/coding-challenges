# ============================
#   1. BUILD STAGE
# ============================
FROM node:18-alpine AS builder

# Install build tools needed for compiling sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /usr/app

# Copy package files & tsconfig first to leverage caching
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies (including dev deps for TypeScript)
RUN npm install

# Copy source code
COPY src ./src

# Build the application (compiling TypeScript → JavaScript)
RUN npm run build

# ============================
#   2. PRODUCTION STAGE
# ============================
FROM node:18-alpine

WORKDIR /usr/app

# (Optional) if you need bash or other tools inside the final container
# RUN apk add --no-cache bash

# Copy only necessary files for production
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy compiled code from builder
COPY --from=builder /usr/app/dist ./dist

# If you have a .env file you want inside the container (for dev/demo),
# uncomment the next line. In production, it’s more common to provide env vars via the CLI or an orchestrator.
# COPY .env .env

# Expose the port your app listens on
EXPOSE 4002

# Start the server. Adjust the path if your main file differs.
CMD ["node", "dist/src/app.js"]
