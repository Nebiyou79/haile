# 1. Build stage
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Copy production env
COPY .env.production .env

RUN npm run build

# 2. Run stage
FROM node:18 AS runner
WORKDIR /app

ENV NODE_ENV=production
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]
