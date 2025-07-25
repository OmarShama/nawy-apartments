# frontend/Dockerfile
FROM node:23.11.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ARG NEXT_PUBLIC_API_URL
ARG API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV API_URL=$API_URL

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
