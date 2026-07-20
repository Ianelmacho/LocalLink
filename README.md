# Local Link

Static frontend for the Local Link phase 1 pilot.

## Live pages

- `index.html`
- `how_it_works.html`
- `mission.html`
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

## Quick front end editing 

- cd "C:\Users\Precision 3551\Desktop\LocalLink\app\frontend\src"
- powershell -ExecutionPolicy Bypass -File .\serve_local.ps1

## When you see (Serving ... at http://localhost:9000/)
## Open a new Terminal 

- Start-Process "http://localhost:9000/"

## Repo Testing as intedend 

- cd "C:\Users\Precision 3551\Desktop\LocalLink"
- docker compose up --build

## Open a new terminal

- Start-Process "http://localhost:9000/"
