FROM node:18

# Install Java
RUN apt-get update && apt-get install -y openjdk-17-jdk

# Set working dir
WORKDIR /app

# Copy code
COPY . .

# Install dependencies
RUN npm install

EXPOSE 3000
CMD ["node", "server.js"]
