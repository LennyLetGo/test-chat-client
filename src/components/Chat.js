import React, { useState, useEffect } from 'react';

const Chat = ({ socket, currentRoom }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Listen for messages from WebSocket
    const handleMessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'message') {
        setMessages((prev) => [...prev, message.message]);
      }
    };

    // Add event listener for incoming messages
    socket.addEventListener('message', handleMessage);

    // Cleanup listener on unmount
    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket]);

  const sendMessage = () => {
    if (input.trim() && currentRoom) {
      const message = JSON.stringify({
        type: 'send message',
        payload: { room: currentRoom, message: input },
      });
      socket.send(message);
      setInput('');
    }
  };

  return (
    <div>
      <h2>Room: {currentRoom || 'None'}</h2>
      <div
        style={{
          border: '1px solid #ccc',
          height: '200px',
          overflowY: 'scroll',
          padding: '10px',
          marginBottom: '10px',
        }}
      >
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
