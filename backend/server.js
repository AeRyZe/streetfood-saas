import http from 'http';
import app from './app.js';

const server = http.createServer(app);
const serverPort = '21000';

app.set('port', serverPort);

server.on('listening', () => {
    console.log('Listening on ' + serverPort);
});

server.listen(serverPort);