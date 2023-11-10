// const express = require('express');

// const app = express();
// const cors = require('cors');
// app.use(cors());
// const port = process.env.PORT || 4000;
// const server = app.listen(port);
// const io = require("socket.io")(server);
// io.on('connection', (socket) => {
//     console.log('Client connected');

//     // Listen for 'message' events from clients
//     socket.on('message', (message) => {
//         console.log('Received message:', message);

//         // Broadcast the message to all connected clients
//         io.emit('message', message);
//     });

//     // Clean up on client disconnect
//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });


//   Send Message With Room


const express = require('express');

const app = express();
const cors = require('cors');
// const rateLimit = require('express-rate-limit');
// const limiter = rateLimit({
//     windowMs: 5000, // 1 second
//     max: 3, // Allow only 1 request per second
// });

// app.use(limiter);

app.use(cors());
const port = process.env.PORT || 4000;
const server = app.listen(port);
const io = require("socket.io")(server);
io.on('connection', (socket) => {
    console.log("Client Connected !");
    socket.on('join-room', (room) => {
        socket.join(room);
        console.log("Client Joined Room");
    });
    socket.on('leave-room', (room) => {
        socket.leave(room);
    });
    socket.on('message', ({ room, data }) => {
        console.log('message Recive');
        const data_1 = {
            message: data.message,
            username: data.username
        };
        console.log(data);
        console.log(room);
        io.to(room).emit('message', room, data_1);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
