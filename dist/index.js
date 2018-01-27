"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ColyseusServer_1 = require("./server/ColyseusServer");
new ColyseusServer_1.default(Number(process.env.PORT || 26857), 'localhost');
