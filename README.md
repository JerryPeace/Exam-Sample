
# Contact APP

Contact-app is a comprehensive full-stack solution developed using Next.js, providing a seamless experience for users to manage their contacts.

### Prerequisites
*  Requires Node version (v16.20.1)
*  Requires pnpm 6


### Setup & Running Instructions

### 1. Running the UI service

  #### Using Docker Compose (Recommended)
  Clone the repository from GitHub and navigate to the root directory of the app.
  You can review the docker-compose.yml file for detailed docker configurations.

  ```
  docker-compose up
  open http://localhost:3001/neptune

  docker-compose stop
  ```

  #### Development by local
  Clone the repository from GitHub and navigate to the root directory of the app.
  (Requires pnpm 6)

  #### Run NEXT.JS server
  ```
  pnpm install
  pnpm run start:local
  open http://localhost:3001/neptune
  ```

### 2. Running App Tests
  I use Jest and React Testing Library, React Testing Library is a JavaScript testing utility built specifically to test React components. It simulates user interactions on isolated components and asserts their outputs to ensure the UI is behaving correctly.
  ```
  pnpm run test
  ```

### 3. Setting up the API service

For the backend API service, refer to https://github.com/resumecompanion/taroko_server.git.

Local API Endpoint:
http://localhost:3000/api