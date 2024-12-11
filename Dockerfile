FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc

CMD ["node", "dist/utils/db.ts"]

EXPOSE 5000

CMD ["node", "dist/server.js"]
