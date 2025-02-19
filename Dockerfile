FROM node:18 as builder

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]