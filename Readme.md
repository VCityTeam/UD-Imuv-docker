# Dockerized Imuv application

This container wraps the [Imuv](https://github.com/VCityTeam/UD-Imuv) application.

Build the docker image with

```bash
docker build -t vcity:imuv Context
```

Then run the container e.g. with

```bash
docker run [--detach] --rm -t vcity:imuv
```

and open a web browser on URL `http://localhost:8000/`

Note: in the above `docker run` command the optionnal `-d` argument requires the container to run in detached mode,

