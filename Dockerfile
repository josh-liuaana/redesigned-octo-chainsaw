FROM node:18
WORKDIR /app

ENV NODE_ENV=production
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

COPY . .

RUN npm run build
RUN npm prune --production