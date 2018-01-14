import * as path from 'path';
import * as express from 'express';
import * as serveIndex from 'serve-index';
import { createServer } from 'http';
import { Server } from 'colyseus';

// Require ChatRoom handler
import { GameRoom } from "./rooms/GameRoom";

const host = String(process.env.COLYSEUS_HOST || 'localhost');
const port = Number(process.env.COLYSEUS_PORT || 39844);
const app = express();

// Create HTTP Server
const httpServer = createServer(app);

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({ server: httpServer });

// Register ChatRoom as "chat"
gameServer.register("chat", GameRoom);

gameServer.listen(port, host, 0, () => {
    console.log(`Listening5 on ${host}:${ port }`);
});