# Landing

[Figma](https://www.figma.com/file/hF63Fs4m46wxuviCr2Z2Fx/Grifon?type=design&node-id=450-2&mode=design&t=oMq20gXkGgO1VYZe-0)

### Prerequisites

- Fill `.env` file
- Add certificate to `./ssl/cert.pom` `./ssl/key.pom`

### Dev setup

`npm i && npm run dev`

### Production build

- https://docs.docker.com/engine/install/ubuntu/
- `sudo docker cpmpose build`
- `sudo docker compose up -d`
- `sudo docker compose logs`

### Deploy

- Example `./deploy.sh your.ip`
