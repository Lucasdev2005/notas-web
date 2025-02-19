FROM node:18 as builder

COPY . .

RUN npm install

CMD ["npm", "run", "start"]