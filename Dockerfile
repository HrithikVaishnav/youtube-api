FROM node:16
# Create app directory
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . ./app
EXPOSE 8080
CMD ["pm2-runtime", "start", "index.js", "-i", "max"]