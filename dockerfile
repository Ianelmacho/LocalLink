FROM nginx:alpine
COPY app/frontend/src/ /usr/share/nginx/html/
EXPOSE 80