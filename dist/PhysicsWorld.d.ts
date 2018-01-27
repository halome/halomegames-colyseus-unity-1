/// <reference types="p2" />
import * as p2 from 'p2';
declare class PhysicsWorld {
    timeStep: number;
    world: p2.World;
    physicsToDOMScale: number;
    entities: any;
    getScaledValue: (value: any) => number;
    constructor();
    addGround: (w: any, h: any, x: any, y: any) => void;
    removeBody(id: string): void;
    moveBody(id: any, axis: any): void;
    addBody(type: string, id: string, x: number, y: number): void;
    lastTime: any;
    maxSubSteps: number;
    fixedDeltaTime: number;
    update(): void;
}
export default PhysicsWorld;
