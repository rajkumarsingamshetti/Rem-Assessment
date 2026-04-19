# Use Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy API code
COPY api/ ./api/

# Expose port 3000 for the API
EXPOSE 3000

# Start the mock server
CMD ["node", "api/mock-server.js"]