FROM node:18
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN yarn install
EXPOSE 80:80
CMD ["node", "app.js"]
