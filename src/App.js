import React, { useState } from 'react';
import io from 'socket.io-client';
import RoomSelector from './components/RoomSelector';
import Chat from './components/Chat';

const socket = io('http://localhost:5000');

const App = () => {
  const [currentRoom, setCurrentRoom] = useState(null);
  const [username, setUsername] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);

  const handleSetUsername = () => {
    if (username.trim()) {
      socket.emit('set username', username);
      setIsUsernameSet(true);
    } else {
      alert('Please enter a valid username.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lenny (Bed)rooms</h1>

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
          <p>Welcome, <strong>{username}</strong>! Enjoy the pillow talk</p>
          <RoomSelector socket={socket} currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} />
          <Chat socket={socket} currentRoom={currentRoom} />
        </>
      )}
    </div>
  );
};

export default App;
