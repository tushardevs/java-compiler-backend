FROM node:18

# Install OpenJDK 17
RUN apt-get update && apt-get install -y openjdk-17-jdk

# Create app directory
WORKDIR /app

# Copy app files
COPY . .

# Install dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Run server
CMD ["node", "server.js"]
