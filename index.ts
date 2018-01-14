import * as path from 'path';
import * as express from 'express';
import * as serveIndex from 'serve-index';
import { createServer } from 'http';
import { Server } from 'colyseus';

// Require ChatRoom handler
import { GameRoom } from "./rooms/GameRoom";

const port = Number(process.env.PORT || 2657);
const app = express();

// Create HTTP Server
const httpServer = createServer(app);

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({ server: httpServer });

// Register ChatRoom as "chat"
gameServer.register("chat", GameRoom);

gameServer.listen(port, 'halomegames-colyseus-unity-1.herokuapp.com', 0, () => {
    console.log(`Listening5 on halomegames-colyseus-unity-1.herokuapp.com:${ port }`);
});