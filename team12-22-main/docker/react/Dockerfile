FROM node:18.15.0

WORKDIR /app/frontend
COPY ./frontend .



RUN npm install
#RUN npm install typescript
#RUN npm install axios
RUN npm run build
RUN npm install -g serve
CMD serve -s build
#CMD npm start
