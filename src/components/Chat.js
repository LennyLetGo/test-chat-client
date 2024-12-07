// src/components/Chat.js
import React, { useState, useEffect } from 'react';


const Chat = ({ socket, currentRoom }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Listen for messages
    socket.on('message', (message) => {
        console.log('MESSAGE')
        setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && currentRoom) {
      socket.emit('send message', { room: currentRoom, message: input });
      setInput('');
    }
  };

  return (
    <div>
      <h2>Room: {currentRoom || 'None'}</h2>
      <div style={{ border: '1px solid #ccc', height: '200px', overflowY: 'scroll', padding: '10px', marginBottom: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={!currentRoom}
      />
      <button onClick={sendMessage} disabled={!currentRoom}>
        Send
      </button>
    </div>
  );
};

export default Chat;
