import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
export default function MessageApp() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [myMessage, setMyMessage] = useState([]);

    const socket = io('http://localhost:4000', { transports: ['websocket'] });
    useEffect(() => {
        // Listen for 'message' events from the server
        socket.emit('join-room', 'myRoom'); //If You Need To Send Message With Room
        socket.on('message', (room, data) => {
            const text = data.message + data.username;
            setMessages((prevMessages) => [...prevMessages, text]);
        });
        // Clean up the socket connection on component unmount
        return () => {
            socket.emit('leave-room', 'myRoom'); //If You Need To Send Message With Room
            // socket.disconnect(); //If You Need Send Message To Client With Then Remove This line
        };
    }, [messages, message]);

    const sendMessage = () => {
        // Emit a 'message' event to the server

        // socket.emit('message', message); only send message
        const data = {
            message: message,
            username: 'coder'
        }
        const room = "myRoom";
        socket.emit('message', { room, data }); //If You Need To Send Message With Room

        // setMessage(''); // Clear the input field after sending
    };
    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <p>My Message</p>
            {/*            <div>
                {myMessage.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
                */}
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};
