# Use an official Node runtime as a parent image
FROM node:19.0.1-alpine3.16
# FROM node:18-alpine


# install
RUN sudo apt update
RUN sudo apt install curl -y
RUN npm install -g node@18.12.1


# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js app for production
RUN npm run build

# Expose the default port used by Next.js (3000)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
