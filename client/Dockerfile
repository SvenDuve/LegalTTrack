FROM nginx:alpine
COPY build /usr/share/nginx/html
# EXPOSE 80
# Replace the default Nginx configuration file or modify it as needed
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]


