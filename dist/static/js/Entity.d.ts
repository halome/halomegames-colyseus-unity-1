import 'p2';
import 'pixi';
import * as Phaser from 'phaser-ce';
declare class Entity {
    sprite: Phaser.Sprite;
    type: string;
    id: string;
    x: number;
    y: number;
    angle: number;
    constructor(id: string, type: string, x: number, y: number, angle: number);
    update(): void;
}
export default Entity;
