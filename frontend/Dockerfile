FROM node:alpine AS build-stage
WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV CI=true


FROM build-stage as production-stage

ENV  REACT_APP_BACKEND_URL=http://localhost:8080/api

RUN npm run build

FROM nginx:1.20-alpine
COPY --from=production-stage /usr/src/app/build /usr/share/nginx/html
