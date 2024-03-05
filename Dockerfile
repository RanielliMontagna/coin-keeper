FROM node:21

# Install PNPM
RUN npm install -g pnpm

# Create app directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Copy pnpm-lock.yaml
COPY pnpm-lock.yaml ./

# Install app dependencies
RUN pnpm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Serve the app
CMD [ "pnpm", "dev" ]