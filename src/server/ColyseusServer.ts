import * as http from 'http';
import * as express from 'express';
import { Server } from 'colyseus';
import ColyseusBaseRoom from './room/ColyseusBaseRoom';

class ColyseusServer {
    port:number;
    endpoint:string;

    constructor(port:number = 2657, endpoint:string = 'localhost') {
        this.port = port;
        this.endpoint = endpoint;

        const app = express();

        const server = http.createServer(app);
        const gameServer = new Server({server: server});

        app.use(express.static(__dirname));

        gameServer.register("ColyseusBaseRoom", ColyseusBaseRoom);
        gameServer.listen(port);

        console.log(`Listening on http://${ this.endpoint }:${ port }`)
    }
}

export default ColyseusServer;