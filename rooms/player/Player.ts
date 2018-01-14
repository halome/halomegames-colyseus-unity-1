import PlayerState from './PlayerState';
import Vector3 from '../Vector3';

class Player {
    public id: string;
    public position: Vector3;
    public rotation: Vector3;
    public speed: number;
    public state: PlayerState;

    constructor(id: string, position = new Vector3(0, 0, 0), rotation = new Vector3(0, 0, 0), speed = 0) {
        this.id = id;
        this.state = PlayerState.STANDING;
        this.position = position;
        this.rotation = rotation;
        this.speed = speed;
    }
}

export default Player;