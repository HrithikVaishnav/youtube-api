FROM node:16
# Create app directory
WORKDIR /app

# Copy files
COPY . .

# Install app dependencies
RUN npm install
RUN npm install pm2 -g

EXPOSE 8000
CMD ["pm2-runtime", "start", "index.js", "-i", "max"]