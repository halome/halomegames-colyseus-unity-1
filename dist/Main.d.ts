import PhysicsWorld from './PhysicsWorld';
declare class Main {
    physicsWorld: PhysicsWorld;
    timeStep: number;
    constructor();
    run(): void;
    update(timeStep: number): void;
}
export default Main;
