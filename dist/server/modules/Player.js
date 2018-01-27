"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const colyseus_1 = require("colyseus");
const Position_1 = require("./Position");
class Player {
    constructor(type, p2Body) {
        this.type = type;
        this.position = new Position_1.default(p2Body.position[0], p2Body.position[1]);
        this.angle = p2Body.angle;
        this.p2Body = p2Body;
    }
    update() {
        this.position.x = this.p2Body.position[0];
        this.position.y = this.p2Body.position[1];
        this.angle = this.p2Body.angle;
    }
}
__decorate([
    colyseus_1.nosync
], Player.prototype, "p2Body", void 0);
exports.default = Player;
