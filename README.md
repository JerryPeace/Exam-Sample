
# Contact APP

### Overview

The Contact-app is a robust solution built on top of Next.js - a comprehensive full-stack server solution.

#### Prerequisites
*  Requires Node version (v16.20.1)

### Run UI service in local

  #### Run app server by docker compose (Recommendation)
  Clone the repository from GitHub and navigate to the root directory of the app.
  You can review the docker-compose.yml file for detailed docker configurations.

  ```
  docker-compose up
  open http://localhost:3001/neptune

  docker-compose stop
  ```

  #### Development by local
  Clone the repository from GitHub and navigate to the root directory of the app.
  (Requires Node version v16.20.1)

  #### Run NEXT.JS server
  ```
  pnpm install
  pnpm run start:local
  open http://localhost:3001/neptune
  ```


### Run API service in local

API repo is https://github.com/resumecompanion/taroko_server.git, Please run api server in local according to README content

API Local Path
http://localhost:3000/api