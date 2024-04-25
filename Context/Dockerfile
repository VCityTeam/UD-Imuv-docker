FROM ubuntu:focal

LABEL maintainer "VCityTeam"
LABEL source.repo "https://github.com/VCityTeam/UD-Imuv-docker"

RUN apt-get update

######### Install the UD-Viz demo per se (client code) and build it
# Node version 14 is required. For its installation (on focal) refer to e.g.
#  https://computingforgeeks.com/install-node-js-14-on-ubuntu-debian-linux/
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
RUN node --version
RUN npm --version
RUN apt-get install -y git
RUN git --version

# The gm module invokes the convert binary through a system call.
# We must thus install imagemagick at the package level
# imagemagick package has dependency that requires some interactive
# configuration. The following is a non interactive workaround, refer to
# https://stackoverflow.com/questions/8671308/non-interactive-method-for-dpkg-reconfigure-tzdata/20693661
ARG DEBIAN_FRONTEND=noninteractive
ARG DEBCONF_NONINTERACTIVE_SEEN=true
RUN echo "tzdata tzdata/Areas select Europe" > preseed.txt
RUN echo "tzdata tzdata/Zones/Europe select Lyon" >> preseed.txt
RUN debconf-set-selections preseed.txt
RUN apt-get install -y imagemagick graphicsmagick wget

RUN git clone https://github.com/VCityTeam/UD-Imuv.git

######### Install Imuv client dependencies
WORKDIR /UD-Imuv/client
ARG checkoutName=main
RUN git checkout $checkoutName
RUN npm install

######### Install Imuv server dependencies 
# Note: the ImuvServer serves two things
#  1. the game server part (where avatars are, collissions...)
#  2. the http server for the client (ExpressJS based)
WORKDIR /UD-Imuv/server
RUN npm install

######## Deploy the Imuv application
# 1. build client bundle + server bundle (with .env variables)
# 2. run server appplication
CMD ["node", "./bin/start.js"]
