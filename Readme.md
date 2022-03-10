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
docker build --no-cache -t vcity:imuv --build-arg checkoutName=nameContext
```

Note: To communicate with the firebase and big blue button back-end the build step need an env.json file in the Context folder.

example of the env.json:

```js
{
  "FOLDER": "../client",
  "PORT": 8000,

  "BBB_URL": "https://manager.bigbluemeeting.com/bigbluebutton/",
  "BBB_SECRET": "ZMNZNVnyi0IqPPJiXI9H4JuznNCEGPfbKCoYIkDOKp",

  "FIREBASE_API_KEY": "AIzaSyCKMd8dIyrDWjUxuLAps9Gix782nK9Bu_o",
  "FIREBASE_AUTH_DOMAIN": "imuv-da2d9.firebaseapp.com",
  "FIREBASE_PROJECT_ID": "imuv-da2d9",
  "FIREBASE_STORAGE_BUCKET": "imuv-da2d9.appspot.com",
  "FIREBASE_MESSAGING_SENDER_ID": "263590659720",
  "FIREBASE_APP_ID": "1:263590659720:web:ae6f9ba09907c746ab813d",
  "FIREBASE_MEASUREMENT_ID": "G-RRJ79PGETS"
}

```

Then run the container e.g. with

```bash
docker run [--detach] --rm -t vcity:imuv
```

Run with redirection of port

```bash
docker run -p 0.0.0.0:443:8000/tcp --detach --rm -t vcity:imuv
```

and open a web browser on URL `http://localhost:8000/`

Note: in the above `docker run` command the optionnal `-d` argument requires the container to run in detached mode
