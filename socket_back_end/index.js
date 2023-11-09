const express = require('express');

const app = express();
const cors = require('cors');
app.use(cors());
const port = process.env.PORT || 4000;
const server = app.listen(port);
const io = require("socket.io")(server);
io.on('connection', (socket) => {
    console.log('Client connected');

    // Listen for 'message' events from clients
    socket.on('message', (message) => {
        console.log('Received message:', message);

        // Broadcast the message to all connected clients
        io.emit('message', message);
    });

    // Clean up on client disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
