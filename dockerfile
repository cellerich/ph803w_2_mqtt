FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install --only=prod

# Bundle app source
COPY . .

CMD [ "node", "main.js" ]