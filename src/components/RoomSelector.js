// src/components/RoomSelector.js
import React from 'react';


const RoomSelector = ({ socket, currentRoom, setCurrentRoom }) => {
  const joinRoom = (room) => {
    if (currentRoom) {
      alert(`Leave the current room (${currentRoom}) before joining another.`);
      return;
    }
    socket.emit('join room', room);
    setCurrentRoom(room);
  };

  const leaveRoom = () => {
    if (!currentRoom) {
      alert('You are not in any room.');
      return;
    }
    socket.emit('leave room', currentRoom);
    setCurrentRoom(null);
  };

  return (
    <div>
      <button onClick={() => joinRoom('master')}>Join Master Room</button>
      <button onClick={() => joinRoom('guest')}>Join Guest Room</button>
      <button onClick={leaveRoom}>Leave Room</button>
    </div>
  );
};

export default RoomSelector;
