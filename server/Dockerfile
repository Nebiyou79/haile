# Backend Dockerfile
FROM node:18

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install --production

# Copy source
COPY . .

EXPOSE 5000
CMD ["npm", "start"]
