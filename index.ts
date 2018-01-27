import * as http from 'http';
import * as path from 'path';
import * as serveIndex from 'serve-index';
import * as express from 'express';
import { Server } from 'colyseus';
import ColyseusServer from './src/server/ColyseusServer';

const app = express();
const server = http.createServer(app);
const gameServer = new Server({server: server});

app.use(express.static(path.join(__dirname, "static")));
app.use('/', serveIndex(path.join(__dirname, "static"), {'icons': true}))

new ColyseusServer(server, Number(process.env.PORT || 26857), 'localhost');