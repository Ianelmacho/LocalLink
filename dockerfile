FROM nginx:alpine

# Copy frontend source files to nginx root
COPY app/frontend/src/ /usr/share/nginx/html/

# Copy photos directory to be accessible from HTML (now referenced as photos/ not ../photos/)
COPY app/frontend/photos/ /usr/share/nginx/html/photos/

EXPOSE 80
