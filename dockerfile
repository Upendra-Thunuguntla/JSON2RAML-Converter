FROM nginx:alpine
LABEL maintainer="Upendra Venkata Muralidhar Thunuguntla -  muralidhar.thunuguntla@gmail.com"

# Copy all files to the nginx default directory
COPY . /usr/share/nginx/html/

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]


#docker build -t json2raml:latest .
#docker tag json2raml:latest upendrathunuguntla/json2raml:latest
#docker push upendrathunuguntla/json2raml:latest