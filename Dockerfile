FROM node:16
  
WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm ci --only=production
  
ENV DATABASE_URL=postgres://postgres:postgres@postgres:5432/postgres
USER node
CMD npm start