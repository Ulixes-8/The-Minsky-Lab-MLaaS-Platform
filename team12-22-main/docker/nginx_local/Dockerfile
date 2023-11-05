#FROM node:latest AS builder
#
#WORKDIR /app/react-frontend
#COPY /dataupload/ .
#
#RUN npm install
#RUN npm install typescript
#RUN npm run build

FROM nginx:latest

COPY default.conf /etc/nginx/conf.d/default.conf

#RUN rm -rf /usr/share/nginx/html/*
#COPY --from=builder /app/react-frontend/build /usr/share/nginx/html

