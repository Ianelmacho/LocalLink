# Local Link

Static frontend for the Local Link phase 1 pilot.

## Live pages

- `index.html`
- `how_it_works.html`
- `mission.html`
- `safety_trust.html`
- `join_pilot.html`
- `local_signup.html`
- `tourist_signup.html`

All live HTML, CSS, and image assets now live under `app/frontend/src`.

## Run locally

### Docker

```bash
docker compose up --build
```

Open `http://localhost:9000/`.

## Project structure

- `app/frontend/src` - current static site pages, styles, and image assets
- `dockerfile` - nginx container for the static site
- `compose.yaml` - local container runner

## Run the site

```bash
docker compose up --build
```

    --build: Takes code and packages it up into a Docker image. If you don't use this option, Docker will use the existing image from the last time, skipping the build step.

    up: runs those images as isolated containers in your local machine and starts them.

## Open a new terminal

- Start-Process "http://localhost:9000/"

## Kill Process

netstat -ano | findstr :9000

netstat -ano

-a : Show all connections and listing ports (not just the active ones)
-n : Show IP addresses instead of hostnames
-o : Show the process ID (PID) associated with each connection

| find str :9000

it feeds the output of the left command into the right command as input,so it will only show the lines that contain :3000, which is the port number that the server is running on


taskkill /F /PID 12345

taskkill: Windows command to terminate a process

/PID <PID> : kill the process with the given PID

/F : Force kill like (kill -9 on Linux)

PID: Unique number that the operating system assigns to any running process.