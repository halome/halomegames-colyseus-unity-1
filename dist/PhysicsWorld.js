"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const p2 = require("p2");
const colyseus_1 = require("colyseus");
const Player_1 = require("./server/modules/Player");
class PhysicsWorld {
    constructor() {
        this.physicsToDOMScale = 1;
        this.entities = {};
        this.getScaledValue = (value) => {
            return value * this.physicsToDOMScale;
        };
        this.addGround = (w, h, x, y) => {
            const groundShape = new p2.Box({
                width: this.getScaledValue(w),
                height: this.getScaledValue(h),
            });
            const groundBody = new p2.Body({
                mass: 0,
                position: [this.getScaledValue(x), this.getScaledValue(y)]
            });
            groundBody.addShape(groundShape);
            this.world.addBody(groundBody);
        };
        this.maxSubSteps = 5; // Max physics ticks per render frame
        this.fixedDeltaTime = 1 / 60; // Physics "tick" delta time
        this.entities = {};
        this.timeStep = 1 / 60;
        this.world = new p2.World({
            gravity: [0, 0],
            broadphase: new p2.SAPBroadphase(0)
        });
        this.world.defaultContactMaterial = new p2.ContactMaterial(new p2.Material(1), new p2.Material(2), {
            friction: 0,
            restitution: 0.2
        });
        //top
        this.addGround(800, 10, 400, 5);
        //bottom
        this.addGround(800, 10, 400, 595);
        //left
        this.addGround(10, 600, 5, 300);
        //right
        this.addGround(10, 600, 795, 300);
        const maxBalls = 40; //Math.floor(Math.random() * 10) + 5;
        console.log(`maxBalls = ${maxBalls}`);
        for (var i = 0; i < maxBalls; i++) {
            const x = Math.floor(Math.random() * this.getScaledValue(780)) + 20;
            const y = Math.floor(Math.random() * this.getScaledValue(580)) + 20;
            console.log(`x = ${x}`);
            console.log(`y = ${y}`);
            this.addBody('ball', `physicsball_${i}`, x, y);
        }
    }
    removeBody(id) {
        const lengthBefore = [...Object.keys(this.entities)].length;
        const body = this.entities[id];
        if (body === undefined) {
            return;
        }
        this.world.removeBody(body.p2Body);
        delete this.entities[id];
        const lengthAfter = [...Object.keys(this.entities)].length;
        console.log(`lengthBefore = ${lengthBefore}, lengthAfter = ${lengthAfter}`);
    }
    moveBody(id, axis) {
        console.log(`moveBody ${id} by ${JSON.stringify(axis)}`);
        const body = this.entities[id];
        body.p2Body.velocity = [axis.x * 100, axis.y * 100];
    }
    addBody(type, id, x, y) {
        console.log(`addBod ${id} at ${x} ${y}`);
        const circleBody = new p2.Body({
            mass: 5,
            position: [this.getScaledValue(x), this.getScaledValue(y)],
        });
        const circleShape = new p2.Circle({ radius: this.getScaledValue(16) });
        circleBody.addShape(circleShape);
        console.log(`add body to array`);
        this.entities[id] = new Player_1.default(type, circleBody);
        this.world.addBody(circleBody);
    }
    update() {
        const now = Date.now();
        let deltaTime = this.lastTime ? (now - this.lastTime) / 1000 : 0;
        this.lastTime = now;
        deltaTime = Math.min(1 / 10, deltaTime);
        this.world.step(this.fixedDeltaTime, deltaTime, this.maxSubSteps);
        [...Object.keys(this.entities)].forEach(id => {
            const player = this.entities[id];
            player.update();
        });
    }
}
__decorate([
    colyseus_1.nosync
], PhysicsWorld.prototype, "timeStep", void 0);
__decorate([
    colyseus_1.nosync
], PhysicsWorld.prototype, "world", void 0);
__decorate([
    colyseus_1.nosync
], PhysicsWorld.prototype, "physicsToDOMScale", void 0);
exports.default = PhysicsWorld;
