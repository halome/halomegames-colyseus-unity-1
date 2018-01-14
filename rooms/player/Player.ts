import PlayerState from './PlayerState';

class Player {
    public id: string;
    public position: {x, y, z};
    public rotation: {x, y, z};
    public speed: number;
    public state: PlayerState;

    constructor(id: string, position = {x: 0, y: 0, z: 0}, rotation = {x: 0, y: 0, z: 0}, speed = 0) {
        this.id = id;
        this.state = PlayerState.STANDING;
        this.position = position;
        this.rotation = rotation;
        this.speed = speed;
    }
}

export default Player;