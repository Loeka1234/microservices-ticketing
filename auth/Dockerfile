FROM node:alpine

WORKDIR /app
COPY package.json .
RUN yarn && yarn -D
COPY . .

CMD ["yarn", "start"]