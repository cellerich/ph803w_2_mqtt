# ph803w_2_mqtt

This is the source code for the Docker Image [ph803w2mqtt](https://hub.docker.com/repository/docker/cellerich/ph803w2mqtt).
It enables users of Home Assistant (or other home automation systems) to monitor the `ph levels` of their pools. The device itself does not have a local API or public access to the cloud data, therefore we interact on the local network with the device and send the available data to our local (or external) MQTT broker.

> The main work was done by Ingo Fischer (see LICENSE) who reverse engineered the local protocol of the `ph803w` device. Thanks a lot for this work! This is a fork of his work you find here: [https://github.com/Apollon77/node-ph803w/](https://github.com/Apollon77/node-ph803w/)

## Usage

You need to be familiar to start a `docker` container on your home network. Easiest way to do this with [Home Assistant](https://www.home-assistant.io/) is to install the [add-on Portainer](https://github.com/hassio-addons/addon-portainer) and create a new container there.

Check out `docker-compose.yml` for details of the container image and environment variables you need to configure the container.

### Environment variables

This environment variables need to be supplied to the container for the system to work.

| Name          | Value                                    |
| ------------- | ---------------------------------------- |
| PH803W_IP     | IP address of PH803W device on local LAN |
| MQTT_IP       | IP address of your MQTT broker           |
| MQTT_user     | username for the MQTT broker             |
| MQTT_pass     | password for the MQTT broker             |
| MQTT_topic    | topic to send for the PH803W data        |
| MQTT_clientID | client ID we send to the MQTT broker     |
| LOGGING       | enable or disable logging on = "on"      |

## Changelog

v0.0.1 - 2021-06-07
First try with a docker install

v0.0.2 - 2021-06-08
Refactored some routines

v0.0.3 - 2021-06-08
First working version

v0.0.4 - 2021-06-08
added LOGGING as optional
