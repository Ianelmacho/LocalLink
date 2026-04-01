FROM nginx:alpine

# Copy the live static site into nginx root
COPY app/frontend/src/ /usr/share/nginx/html/

EXPOSE 80
