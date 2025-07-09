# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package.json and lock file
COPY package.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built output only
COPY --from=build /app/.output .output
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules

# Environment variables will be provided at runtime

# Set runtime env vars
ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV OPENWEATHER_API_KEY=939b38bfd0a7eb21b24aee41b261cfd0

# Expose the port the app will run on
EXPOSE 3000

# Command to run the application
CMD ["node", ".output/server/index.mjs"]