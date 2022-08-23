# This installs node and npm
FROM node:16

# Create a directory to hold the app code inside the image
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source (copy from image to container)
COPY . .

# Make 3000 port mapped by the docker daemon (port for app)
EXPOSE 3000

# Commands to run
# CMD [ "npm", "run", "db-init" ]
CMD [ "npm", "run", "serve" ]