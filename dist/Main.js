"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PhysicsWorld_1 = require("./PhysicsWorld");
class Main {
    constructor() {
        this.physicsWorld = new PhysicsWorld_1.default();
    }
    run() {
        const timeStep = 1 / 60;
        setInterval(() => this.update(timeStep), 1000 * timeStep);
    }
    update(timeStep) {
        this.physicsWorld.update(timeStep);
    }
}
exports.default = Main;
