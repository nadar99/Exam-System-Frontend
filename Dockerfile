FROM nginx:latest

COPY /dist/question-bank  /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
