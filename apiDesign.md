Here's the updated **Markdown** guide with the required prerequisites (Java, Express.js, and OpenAPI) included:

```markdown
# Deployment Guide to Run API Design Locally

## Prerequisites
Before running the API design locally, ensure you have the following installed:

- **Java (version 11 or higher)**: Required for OpenAPI generation. Download and install from [here](https://www.oracle.com/java/technologies/javase-downloads.html).
  - Verify installation:
    ```bash
    java -version
    ```
  
- **Node.js** and **npm**: Required for running the API server. Download from [here](https://nodejs.org/).
  - Verify installation:
    ```bash
    node -v
    npm -v
    ```

- **Express.js**: Installed as part of the project dependencies.
  - You will install this when you run `npm install` in the following steps.

- **OpenAPI Generator**: If you're working with OpenAPI YAML files for API design, ensure you have `openapi-generator-cli` installed globally.
  - Install OpenAPI Generator:
    ```bash
    npm install -g @openapitools/openapi-generator-cli
    ```

---

## 1. Clone the Repository
First, clone the API design repository from the Git source:

```bash
git clone <repository-url>
```

For example:

```bash
git clone https://github.com/your-username/your-api-design-repo.git
```

After cloning, navigate to the project folder:

```bash
cd your-api-design-repo
```

## 2. Switch to the `apidesign` Branch
Make sure you are on the `apidesign` branch by checking out the branch:

```bash
git checkout apidesign
```

## 3. Install Dependencies
Before running the API, install all the necessary dependencies. Run the following command in your project directory:

```bash
npm install
```

This will download and install all the required packages listed in the `package.json` file.

## 4. Run the API Server
Once the dependencies are installed, start the API server by running:

```bash
npm run
```

The terminal will display information about the running server, including the port it's using (e.g., `http://localhost:3000` or similar).

## 5. Access API Documentation
After the server starts, navigate to your browser and open the following URL:

```
http://localhost:<replace-with-your-port>/api-docs/
```

- Replace `<replace-with-your-port>` with the port number displayed in the terminal after running the app (e.g., `3000`, `4000`, etc.).
  
For example, if the server is running on port `3000`, the URL would be:

```
http://localhost:3000/api-docs/
```

This will bring up the API documentation interface, where you can interact with and test the API endpoints.

## 6. Troubleshooting
- If the server doesn’t start or you encounter any issues, ensure all dependencies are installed by running:

```bash
npm install
```

- Check the terminal output for any errors and verify you are on the correct branch (`apidesign`).

By following these steps, you can successfully deploy and run the API design locally.
```

This guide now includes the necessary prerequisites like Java, Node.js, Express.js, and OpenAPI.