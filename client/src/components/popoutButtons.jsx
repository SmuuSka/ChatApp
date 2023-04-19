import React, { useState } from 'react';

const RoomPopup = ({ onJoin, mode }) => {
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');

  const handleJoin = () => {
    onJoin(roomName, password);
  };

  return (
    <div className="popup">
      <h2>{mode}</h2>
      <label>
        Room Name:
        <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleJoin}>{mode}</button>
    </div>
  );
}

const RoomButton = () => {
  const [show, setShow] = useState(false);

  const handleJoin = (roomName, password) => {
    // Do something with roomName and password, e.g. join a chat room
    console.log(`Joining room "${roomName}" with password "${password}"`);
    // Close the popup
    setShow(false);
  };

  return (
    <div className='join-create-buttons'>
      <button className="join-room-button" onClick={() => setShow('join')}>Join Room</button>
      <button className="join-room-button" onClick={() => setShow('create')}>Create Room</button>
      {show && <RoomPopup onJoin={handleJoin} mode={show}/>}
    </div>
  );
}

export default RoomButton;
