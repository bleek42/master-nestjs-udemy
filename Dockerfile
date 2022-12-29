FROM node:18.12.1-alpine3.16 AS development

EXPOSE 7000
WORKDIR /apps/nodejs/master-nestjs
RUN npm config set cache /apps/nodejs/master-nestjs/ --global

COPY package-lock.json /apps/nodejs/master-nestjs/
COPY package.json /apps/nodejs/master-nestjs/
RUN npm install
COPY . .

RUN npm run format /apps/nodejs/master-nestjs/
RUN npm run lint /apps/nodejs/master-nestjs/

RUN npm run prebuild /apps/nodejs/master-nestjs/
RUN npm run build /apps/nodejs/master-nestjs/

CMD "./init.sh"
