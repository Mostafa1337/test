FROM node:22.8.0-alpine AS stage

WORKDIR /app/temp

COPY ./package*.json ./
RUN npm install 
RUN npm install -g @nestjs/cli --save

COPY . .

RUN npm run build

FROM node:22.8.0-alpine AS build

WORKDIR /app

COPY --from=stage /app/backend/build/dist ./dist
#TODO add --omit=dev to exclude dev dependencies  
COPY --from=stage /app/backend/build/node_modules ./node_modules
COPY --from=stage /app/backend/build/package*.json .

ENV NODE_ENV=production

CMD ["sh", "-c", "npm run migrate:runprod && npm run start:prod"]