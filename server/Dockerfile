# Backend Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Use .env.production
ENV NODE_ENV=production
COPY .env.production .env

EXPOSE 5000
CMD ["npm", "start"]
