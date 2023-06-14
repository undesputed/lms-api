FROM node:14-alpine

WORKDIR /

COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 8080

# CMD ["npx", "nodemon", "--inspect=0.0.0.0:9229", "--exec", "node", "--", "server.js"]
CMD ["node", "server.js"]