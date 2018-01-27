import { Room } from 'colyseus';
import PhysicsWorld from '../../PhysicsWorld';
declare class ColyseusBaseRoom extends Room<PhysicsWorld> {
    onInit(options: any): void;
    onJoin(client: any, options: any): void;
    onMessage(client: any, data: any): void;
    onLeave(client: any): void;
    onDispose(): void;
}
export default ColyseusBaseRoom;
