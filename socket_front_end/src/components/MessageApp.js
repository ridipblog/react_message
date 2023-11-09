import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
export default function MessageApp() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [myMessage, setMyMessage] = useState([]);

    const socket = io('http://localhost:4000', { transports: ['websocket'] });
    useEffect(() => {
        // Listen for 'message' events from the server
        socket.on('message', (newMessage) => {
            console.log(newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
        // Clean up the socket connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, [messages, message]);

    const sendMessage = () => {
        // Emit a 'message' event to the server
        socket.emit('message', message);
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
            <div>
                {myMessage.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};