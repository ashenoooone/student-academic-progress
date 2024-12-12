FROM node:20.18.0

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm i
COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "start:dev:migrate"]