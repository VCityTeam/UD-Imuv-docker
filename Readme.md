# Dockerized Imuv application

This container wraps the [Imuv](https://github.com/VCityTeam/UD-Imuv) application.

Build the docker image with

```bash
docker build -t vcity:imuv Context
```

no cache options :

```bash
docker build --no-cache -t vcity:imuv Context
```

If you want specify a branch name or commit name for Imuv use this

```bash
docker build -t vcity:imuv --build-arg checkoutName=name Context
```

no cache options :

```bash
docker build --no-cache -t vcity:imuv --build-arg checkoutName=name Context
```

Note: To communicate with the firebase and big blue button back-end the build step need an .env file in the Context folder.

example of the .env:

```bash
wget -cO -  https://raw.githubusercontent.com/VCityTeam/UD-Imuv/master/server/default.env  > .env
# Fill the .env
```

Then run the container e.g. with

```bash
docker run --rm --env-file .env -t vcity:imuv
```

```bash
docker run [--detach] --rm --env-file .env -t vcity:imuv
```

Run with redirection of port

```bash
docker run -p 0.0.0.0:443:8000/tcp --detach --rm --env-file .env -t vcity:imuv
```

and open a web browser on URL `http://localhost:8000/`

Note: in the above `docker run` command the optionnal `-d` argument requires the container to run in detached mode
