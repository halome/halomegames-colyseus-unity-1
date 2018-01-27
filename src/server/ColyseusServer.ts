import { Server } from 'colyseus';
import * as http from 'http';
import ColyseusBaseRoom from './room/ColyseusBaseRoom';

class ColyseusServer {
    port:number;
    endpoint:string;

    constructor(server: http.Server, port:number, endpoint:string = 'localhost') {
        this.port = port;
        this.endpoint = endpoint;
        const gameServer = new Server({server});
        gameServer.register("ColyseusBaseRoom", ColyseusBaseRoom);
        gameServer.listen(port);

        console.log(`Listening on http://${ this.endpoint }:${ port }`)
    }
}

export default ColyseusServer;