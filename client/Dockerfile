FROM node:10.21.0 as builder
WORKDIR /app
COPY ./ /app
RUN npm install && npm run build

FROM nginx:alpine
ADD docker/nginx-default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
