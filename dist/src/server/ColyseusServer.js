"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colyseus_1 = require("colyseus");
const ColyseusBaseRoom_1 = require("./room/ColyseusBaseRoom");
class ColyseusServer {
    constructor(server, port, endpoint = 'localhost') {
        this.port = port;
        this.endpoint = endpoint;
        const gameServer = new colyseus_1.Server({ server });
        gameServer.register("ColyseusBaseRoom", ColyseusBaseRoom_1.default);
        gameServer.listen(port);
        console.log(`Listening on http://${this.endpoint}:${port}`);
    }
}
exports.default = ColyseusServer;
