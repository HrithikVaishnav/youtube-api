FROM node:16
# Create app directory
WORKDIR D:\works\FamPay

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "index.js" ]