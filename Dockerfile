# Base Image
FROM node:alpine

# Meta
MAINTAINER kanekotic <alvarojosepl@gmail.com>

# Setup
RUN mkdir -p /app/ 
WORKDIR /app/
COPY . /app/
RUN npm install  --production

# Execution
CMD node index.js