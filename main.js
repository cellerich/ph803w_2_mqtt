/* eslint-disable eqeqeq */
const {
    PH803WDevice
} = require('./index');
const mqtt = require('mqtt');

async function main() {

    //connect to device and MQTT
    const device = new PH803WDevice(process.env.PH803W_IP);

    const client = new mqtt.connect('mqtt://' + process.env.MQTT_IP, {
        clientId: process.env.MQTT_clientID,
        username: process.env.MQTT_user,
        password: process.env.MQTT_pass
    });

    const options = {
        retain: true,
        qos: 1
    };

    // device events
    device.on('error', err => {
        console.log('Error: ' + err);
    });

    device.on('data', data => {
        const msg = JSON.stringify(data);
        if (process.env.LOGGING == "on") {
            console.log('Data: ' + msg);
        }

        if (client.connected == true) {
            client.publish(process.env.MQTT_topic, msg, options);
            if (process.env.LOGGING == "on") {
                console.log('MQTT sent: ' + msg);
            }
        }
    });

    device.on('connected', async () => {
        await device.login();
        await device.retrieveData();
    });

    // mqtt events
    client.on('error', function (error) {
        console.log("Can't connect to MQTT: " + error);
    });

    client.on("connect", function () {
        if (process.env.LOGGING == "on") {
            console.log("connected:  " + client.connected);
        }
    })

    await device.connect();
}

main();