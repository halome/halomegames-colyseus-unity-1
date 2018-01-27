import * as http from 'http';
import * as path from 'path';
import * as serveIndex from 'serve-index';
import * as express from 'express';
import { Server } from 'colyseus';
import ColyseusBaseRoom from './src/server/room/ColyseusBaseRoom';

const port = Number(process.env.PORT || 26857);
const endpoint = 'localhost';

const app = express();
const server = http.createServer(app);
const gameServer = new Server({server: server});

app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, "static")));
// app.use('/', serveIndex(path.join(__dirname, "static"), {'icons': true}))

gameServer.register("ColyseusBaseRoom", ColyseusBaseRoom);
gameServer.listen(port);

console.log(`Listening on http://${ this.endpoint }:${ port }`)