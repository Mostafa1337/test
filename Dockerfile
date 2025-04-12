FROM node:22.8.0-alpine as Stage

WORKDIR /app/temp

COPY ./package*.json ./
RUN npm install --omit=dev
RUN npm install -g @nestjs/cli@10.4.7 --save

COPY . .

RUN npm run build --omit=dev

FROM node:22.8.0-alpine as Build

WORKDIR /app

COPY --from=Stage /app/backend/build/dist ./dist
COPY --from=Stage /app/backend/build/node_modules ./node_modules
COPY --from=Stage /app/backend/build/package*.json .

ENV NODE_ENV=production

RUN npm run migration:run

CMD ["sh", "-c", "npm run migrate:run && npm run start"]