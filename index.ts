import * as path from 'path';
import * as express from 'express';
import * as serveIndex from 'serve-index';
import { createServer } from 'http';
import { Server } from 'colyseus';

// Require ChatRoom handler
import { GameRoom } from "./rooms/GameRoom";

const port = Number(process.env.COLYSEUS_PORT || process.env.PORT || 39844);
const app = express();

// Create HTTP Server
const httpServer = createServer(app);

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({ server: httpServer });

// Register ChatRoom as "chat"
gameServer.register("chat", GameRoom);

app.use(express.static(path.join(__dirname, "static")));
app.use('/', serveIndex(path.join(__dirname, "static"), {'icons': true}))

gameServer.listen(port);

console.log(`Listening on ${ port }`);