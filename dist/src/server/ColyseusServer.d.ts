/// <reference types="node" />
import * as http from 'http';
declare class ColyseusServer {
    port: number;
    endpoint: string;
    constructor(server: http.Server, port: number, endpoint?: string);
}
export default ColyseusServer;
