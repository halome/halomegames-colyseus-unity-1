"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colyseus_1 = require("colyseus");
const PhysicsWorld_1 = require("../../PhysicsWorld");
class ColyseusBaseRoom extends colyseus_1.Room {
    //physicsWorld:PhysicsWorld = new PhysicsWorld(1/60);
    onInit(options) {
        console.log(`initializing...`);
        this.setPatchRate(1000 / 20);
        this.setState(new PhysicsWorld_1.default());
        setInterval(() => this.state.update(), 1000 * 1 / 60);
        console.log("ColyseusBaseRoom created");
    }
    onJoin(client, options) {
        console.log("client has joined!");
        console.log("client.id:", client.id);
        console.log("client.sessionId:", client.sessionId);
        console.log("with options", options);
        const x = Math.floor(Math.random() * 780) + 20;
        const y = Math.floor(Math.random() * 580) + 20;
        this.state.addBody('player', client.sessionId, x, y);
    }
    onMessage(client, data) {
        console.log("ChatRoom:", client.sessionId, data);
        if (data.axis && data.axis.x != 0 || data.axis.y != 0) {
            console.log(`data.axis = ${data.axis}`);
            this.state.moveBody(data.id, data.axis);
        }
    }
    onLeave(client) {
        this.state.removeBody(client.sessionId);
        console.log(`${client.sessionId} left.`);
    }
    onDispose() {
        console.log("Disposing ChatRoom...");
    }
}
exports.default = ColyseusBaseRoom;
