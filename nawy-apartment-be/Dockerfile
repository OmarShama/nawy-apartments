# backend/Dockerfile
FROM node:23.11.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3005
CMD ["node", "dist/main"]
