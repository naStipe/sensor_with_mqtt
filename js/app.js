const mqtt= require ('mqtt')
const http = require('http');
const {readDB} = require("./DBManager");
const HOST = "mqtt://172.20.49.21:1883"
const TOPIC = 'esp32/temperature'

var mqttMessage = 'Null'

temperature_list = readDB()

//create a server object:
http.createServer(function (req, res) {
    res.write(temperature_list); //write a response to the client
    res.end(); //end the response
}).listen(8080); //the server object listens on port 8080



const options = {
    // Clean session
    clean: true,
    connectTimeout: 4000,
}
const client  = mqtt.connect(HOST, options)
client.on('connect', function () {
    console.log('Connected')
    // Subscribe to a topic
    client.subscribe('esp32/temperature', function (err) {}
    )
})

// Receive messages


client.on('message', function (topic, message){
    mqttMessage = message.toString()

    console.log(message.toString())
})

