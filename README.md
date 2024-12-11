# Backend Setup

To set up the backend, follow these steps:

1. **Create the .env file**:

   Copy the contents of the .env.example file into a new .env file. You can do this by running the following command:

   ```bash
   cp .env.example .env

2. **Build the Docker images**:

   Once the .env file is set up, run the following command to build the Docker images using Docker Compose:

   ```bash
   docker-compose build

3. **Start the Docker containers**:

   After building the images, you can start the Docker containers with this command:

   ```bash
   docker-compose up
