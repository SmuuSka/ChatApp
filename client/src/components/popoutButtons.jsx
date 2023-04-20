import React, { useState } from 'react';
import chatService from '../services/chatService';

const RoomPopup = ({ onJoin, onCreate, mode }) => {
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');

  const handleJoin = () => {
    onJoin(roomName, password);
  };

  const handleCreate = () => {
    onCreate(roomName, password)
  }

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
      {
      mode === 'join' ? 
      <button onClick={handleJoin}>{mode}</button> : 
      <button onClick={handleCreate}>{mode}</button>
      }
    </div>
  );
}

const RoomButton = ({socket}) => {
  const [show, setShow] = useState(false);

  const handleJoin = (roomName, password) => {
    console.log(`Joining room "${roomName}" with password "${password}"`);
    socket.emit('join-room-button', roomName, password)
    setShow(false);
  };

  const handleCreate = async (roomName, password) => {
    try {
      await chatService.createRoom(roomName, password)
      setShow(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='join-create-buttons'>
      <button className="join-room-button" onClick={() => setShow('join')}>Join Room</button>
      <button className="join-room-button" onClick={() => setShow('create')}>Create Room</button>
      {show && <RoomPopup onJoin={handleJoin} onCreate={handleCreate} mode={show}/>}
    </div>
  );
}

export default RoomButton;
