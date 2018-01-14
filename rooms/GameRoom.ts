import { Room } from "colyseus";

import GameState from './GameState';
import Player from './player/Player';
import Vector3 from './Vector3';

export class GameRoom extends Room<GameState> {
    maxClients = 6;

    onInit(options) {
        this.setPatchRate( 1000 / 20 );
        this.setSimulationInterval( this.update.bind(this) );
        this.setState(new GameState());

        console.log("GameRoom created!", options);        
    }

    onJoin(client) {
        const clientId = client.sessionId;
        this.state.AddPlayer(new Player(clientId));

        console.log(`client ${clientId} joined!`);        
        console.log("num clients:", this.state.GetPlayersNumber());
    }

    onLeave(client) {
        this.state.RemovePlayer(client.sessionId);

        console.log(`client ${client.sessionId} left!`);        
    }

    onMessage(client, data){
        const player = this.state.GetPlayerById(client.sessionId);
        if(!player){
            return;
        }

        switch (data.action) {
            case 'update_position': {
                player.position = Vector3.fromJSON(data.position);
                break;
            }
        }
    }

    update () {

    }

    onDispose(){
        console.log('GameRoom disposed!');
    }
}