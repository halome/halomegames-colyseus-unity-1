import ColyseusServer from './server/ColyseusServer';

new ColyseusServer(Number(process.env.PORT || 26857), 'localhost');