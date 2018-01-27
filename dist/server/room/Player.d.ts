/// <reference types="p2" />
import * as p2 from 'p2';
declare class Player {
    position: any;
    angle: number;
    p2Body: p2.Body;
    constructor(position: any, angle: number, p2Body: p2.Body);
    update(): void;
}
export default Player;
