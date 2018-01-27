"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const express = require("express");
const colyseus_1 = require("colyseus");
const ColyseusBaseRoom_1 = require("./room/ColyseusBaseRoom");
class ColyseusServer {
    constructor(port, endpoint = 'localhost') {
        this.port = port;
        this.endpoint = endpoint;
        const app = express();
        const server = http.createServer(app);
        const gameServer = new colyseus_1.Server({ server: server });
        app.use(express.static(__dirname));
        gameServer.register("ColyseusBaseRoom", ColyseusBaseRoom_1.default);
        gameServer.listen(port);
        console.log(`Listening on http://${this.endpoint}:${port}`);
    }
}
exports.default = ColyseusServer;
