# source: @platform-fe/shared

# build stage
FROM registry.ae-rus.net/mirror/node:12 as build-stage
ENV REACT_APP_DEPLOY_ENV ${DEPLOY_ENV}
ARG BUILD_ENV
WORKDIR /
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# production-stage
FROM registry.ae-rus.net/docker/openresty:1.19.3 as production-stage

WORKDIR /
RUN env
COPY --from=build-stage /build /usr/local/openresty/nginx/html
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/host.nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]