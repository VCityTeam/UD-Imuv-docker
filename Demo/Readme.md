
## Running the demo for the first time

The only pre-requisite is to have a host with a running
[docker daemon](https://docs.docker.com/)
(on the CLI try running `docker ps`) and the
[docker compose](https://docs.docker.com/compose/)
command installed.

Copy the [`env-default`](env-default) to `.env` file docker-compose environment
file and customize it to fit your needs.

>>**Caveat emptor**:
>>when starting the server for the first time make sure to
  start with a clean slate database by applying a command of the form

  ```bash
  rm -fr mongo-data/[A-z]*
  ```

>>Otherwise, if the `mongo-data` directory happens to have a data base image
(stored in a previous run and hidden by the `.gitignore`) with a different
pair of `username/password` as the one provided in the customized `.env` file,
the mongo database won't complain on still launch smoothly.
Yet the `username/password` won't be the ones provided in the `.env` file
... but the ones encountered in the saved image of the database.
And this will most often bite you down the road. :-/

In order to launch the demo (from a terminal) clone this repository and
change the directory to be the one holding this Readme.md file and run the
following command (the "-d" is to run the command in background):

```bash
docker-compose up -d
```

## Checking the installation

Once docker-compose is running, one can follow the parse-server documentation
(refer to the
["saving an object" section](https://hub.docker.com/r/parseplatform/parse-server/#saving-an-object))
and try creating an entry in the parse server with the following command

```bash
curl -X POST -H "X-Parse-Application-Id: my_parse_app_id" \
     -H "Content-Type: application/json" \
     -d '{"score":1337,"playerName":"John Doe","cheatMode":false}' \
     http://localhost:1337/parse/classes/GameScore
```

that should provide you with an answer of the form

```bash
{"objectId":"8A0YN6GkJ7","createdAt":"2022-04-26T16:33:59.551Z"}
```

## Trouble shooting

In case some manual troubleshooting is required, containers can be
run from cli with the following commands

```bash
# Make sure we start with a clean slate database.
# WARNING: if you forget this clean-up and your database
#   was set up with different username/password, mongodb won't
#   complain on launch. Yet the password won't be the ones 
#   provided as environment variables...but the ones encountered
# in the saved db. 
# And this will burn you quite some time down the road. :-/
rm -fr mongo-data/[A-z]*
docker network create imuv-net
docker run --rm -d --network imuv-net --name my-mongo \
   -e MONGO_INITDB_ROOT_USERNAME=mygogo -e MONGO_INITDB_ROOT_PASSWORD=mydummypass \
   -v $(pwd)/mongo-data:/data/db mongo
# Optionnal: look about possible complaints of database
docker logs --follow --until=10s my-mongo
# Make sure one can connect to the database (exit with quit)
docker run -it --rm --network imuv-net mongo mongo --host my-mongo -u mygogo -p mydummypass
# Run the parse server
docker run --network imuv-net --rm --name my-parse-server \
  -p 1337:1337 parseplatform/parse-server \
  --appId APPLICATION_ID \
  --masterKey MASTER_KEY \
  --databaseURI mongodb://mygogo:mydummypass@my-mongo:27017
```
