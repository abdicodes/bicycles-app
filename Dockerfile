FROM node:alpine
  
WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm ci --only=production
  
USER node
CMD npm start