import {nosync} from 'colyseus';
import * as p2 from 'p2';
import Position from './Position';

class Player {
    @nosync p2Body:p2.Body;
    
    type:string;
    position:Position;
    angle:number;

    constructor(type:string, p2Body:p2.Body){
        this.type = type;
        this.position = new Position(p2Body.position[0], p2Body.position[1]);
        this.angle = p2Body.angle;
        this.p2Body = p2Body;
    }

    public update() {
        this.position.x = this.p2Body.position[0];
        this.position.y = this.p2Body.position[1];
        this.angle = this.p2Body.angle;
    }
}

export default Player;