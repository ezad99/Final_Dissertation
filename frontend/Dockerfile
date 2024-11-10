# frontend/Dockerfile
# 1. Use Node.js as the base image
FROM node:18 AS builder

# 2. Set working directory and copy the frontend code
WORKDIR /app

# Clear npm cache
RUN npm cache clean --force
COPY . .

# 3. Install dependencies and build the project
RUN npm install
RUN npm run build

# 4. Expose the port for Vite preview
EXPOSE 3000

# 5. Start Vite preview server in production mode
CMD ["npm", "run", "preview"]
