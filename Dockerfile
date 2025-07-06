FROM node:lts-alpine

# Install the HTTP server to serve the app
RUN npm install -g http-server

# Install the app in /app
WORKDIR /app

# Install the depencencies
COPY package*.json ./
RUN npm install

# Copy project files and folders
COPY . .

# Build the app for production
RUN npm run build
EXPOSE 8080

# Run the entry point to configure environment variables
RUN chmod +x entry_point.sh

# Run the app
CMD ["/app/entry_point.sh"]
