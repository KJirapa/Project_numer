# base image
FROM node:16-alpine

# set working directory
WORKDIR /app

COPY package.json ./

RUN npm ci
COPY . .
# add `/usr/src/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH
EXPOSE 1400
# install and cache app dependencie

# start app
CMD ["node","index.js"]