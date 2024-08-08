import Waiting from './models/waiting.js';
import express from 'express'
import mongoose from 'mongoose';
import { WebSocketServer, WebSocket } from 'ws';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 22000;

mongoose.connect(`mongodb+srv://${process.env.VITE_MONGO_USR}:${process.env.VITE_MONGO_PWD}@cluster0.71wjekv.mongodb.net/db?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => console.log('Connecté à MongoDB !'))
.catch(() => console.log('Non connecté à MongoDB !'));

const server = app.listen(port, () => {
    console.log(`WebSocket listening on port ${port}`);
})

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('WebSocket message received: ', message);
    };

    ws.on('close', (code, reason) => {
        console.log(`Client disconnected: ${code} ${reason}`);
    });

    ws.on('error', (error) => {
        console.error('WebSocket error: ', error);
    });
});

Waiting.watch().on('change', (change) => {
    console.log('Change detected: ', change);
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(change));
        }
    });
});