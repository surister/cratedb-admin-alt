FROM nginx:latest

COPY dist /usr/share/nginx/html/admin
COPY default.conf /etc/nginx/conf.d/