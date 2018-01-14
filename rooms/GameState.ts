import Player from "./player/Player";
import { Dictionary } from 'typescript-collections';

class GameState {
    private players;

    constructor() {
        this.players = {}
    }

    public AddPlayer(player: Player) {
        this.players[player.id] = player;
    }

    public RemovePlayer(id: string) {
        delete this.players[id];
    }

    public GetPlayerById(id: string): Player {
        return this.players[id];
    }

    public GetPlayersNumber(): number {
        return Object.keys(this.players).length;
    }
}

export default GameState;