import React from 'react';

const RoomSelector = ({ socket, currentRoom, setCurrentRoom }) => {
  const joinRoom = (room) => {
    if (currentRoom) {
      alert(`Leave the current room (${currentRoom}) before joining another.`);
      return;
    }

    // Send a message to join the room
    const message = JSON.stringify({ type: 'join room', payload: room });
    socket.send(message);
    setCurrentRoom(room);
  };

  const leaveRoom = () => {
    if (!currentRoom) {
      alert('You are not in any room.');
      return;
    }

    // Send a message to leave the room
    const message = JSON.stringify({ type: 'leave room', payload: currentRoom });
    socket.send(message);
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
