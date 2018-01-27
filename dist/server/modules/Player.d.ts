/// <reference types="p2" />
import * as p2 from 'p2';
import Position from './Position';
declare class Player {
    p2Body: p2.Body;
    type: string;
    position: Position;
    angle: number;
    constructor(type: string, p2Body: p2.Body);
    update(): void;
}
export default Player;
