# Dockerized Imuv application

This container wraps the [Imuv](https://github.com/VCityTeam/UD-Imuv) application.

## Build the docker image

```bash
docker build -t vcity:imuv Context
```

no cache options :

```bash
docker build --no-cache -t vcity:imuv Context
```

If you want specify a branch name or commit name for Imuv use this (by default it's master):

```bash
docker build -t vcity:imuv --build-arg checkoutName=master Context
```
## Env Variables

.env file is used to specify the environment variables for the container. You can use the UD-Imuv/master/env-default file as a template.


Get the env-default file from the UD-Imuv repository and copy it in a .env file.

```bash
wget -cO -  https://raw.githubusercontent.com/VCityTeam/UD-Imuv/master/env-default  > .env
# Fill the .env
```

You can have descriptions of the variables in the [UD-Imuv Readme](https://github.com/VCityTeam/UD-Imuv#set-the-environment-variables).


Note: If you have not launch a parse-server and a mongodb service as explain [here](https://github.com/VCityTeam/UD-Imuv#install-parse-server-and-mongodb-optionnal) some features will be not available.

## Run the docker image

Run with redirection of port

```bash
docker run -p 0.0.0.0:8042:8000/tcp [--detach] --rm --env-file .env -t vcity:imuv
```

- -p : redirect the port 8000 of the container to the port 8042 of the host
- --detach : run the container in background
- --rm : remove the container when it stops
- --env-file : specify the .env file
- -t : tag of the image

and open a web browser on URL `http://localhost:8042/` 
