FROM node:latest AS builder

WORKDIR /app/frontend
COPY ./frontend .

RUN npm install
RUN npm run build

FROM nginx:latest

COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY ./docker/nginx/ssl /ssl/

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/frontend/build /usr/share/nginx/html/