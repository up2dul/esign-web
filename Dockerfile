# Stage 1: Build the Vite application
FROM node:22-alpine AS build

WORKDIR /app

# Copy package.json and npm lockfile
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci || npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:22-alpine

# Install 'serve' globally to run the static files
RUN npm install -g serve

WORKDIR /app

# Copy the built assets from the previous stage
COPY --from=build /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Start server (-s for single-page application routing, -l for port listener)
CMD ["serve", "-s", "dist", "-l", "3000"]
