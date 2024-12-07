import React, { useState, useEffect, useRef } from 'react';
import RoomSelector from './components/RoomSelector';
import Chat from './components/Chat';

// Initialize WebSocket connection
const ws = new WebSocket('ws://ec2-3-147-54-72.us-east-2.compute.amazonaws.com:5000');
const App = () => {
  const [socket, setSocket] = useState(null); // Store WebSocket instance
  const [currentRoom, setCurrentRoom] = useState(null);
  const [username, setUsername] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = ws;

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Message from server:', message);
    };

    setSocket(ws);

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, []);

  const handleSetUsername = () => {
    if (username.trim()) {
      const message = JSON.stringify({ type: 'set username', payload: username });
      socketRef.current.send(message); // Send username to the server
      setIsUsernameSet(true);
    } else {
      alert('Please enter a valid username.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lenny Business</h1>

      {!isUsernameSet ? (
        <div>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleSetUsername}>Set Username</button>
        </div>
      ) : (
        <>
          <p>
            Welcome, <strong>{username}</strong>! Let's align on your overall goals.
          </p>
          <RoomSelector socket={socketRef.current} currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} />
          <Chat socket={socketRef.current} currentRoom={currentRoom} />
        </>
      )}
    </div>
  );
};

export default App;
