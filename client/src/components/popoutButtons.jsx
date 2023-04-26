import React, { useState } from 'react';
import chatService from '../services/chatService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes } from '@fortawesome/free-solid-svg-icons';
const RoomPopup = ({ onJoin, onCreate, mode, onClose }) => {

  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');

  const handleJoin = () => {
    onJoin(roomName, password);
    setPassword('')
    setRoomName('')
  };

  const handleCreate = () => {
    onCreate(roomName, password)
    setPassword('')
    setRoomName('')
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <div className="popup">
      <button id = "exitButtoncreateRoom" className="exit-button" onClick={handleClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2>{mode}</h2>
      <label>
        Room Name:
        <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} required="true"/>
      </label>
      <label>
        Password:
        <input type="password" placeholder="leave blank to join/create room with no password"value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {
      mode === 'join' ?
      <button  id = "buttoncreateRoom" onClick={handleJoin}>{mode}</button> :
      <button  id = "buttoncreateRoom" onClick={handleCreate}>{mode}</button>
      }
    </div>
  );
}

const RoomButton = ({socket, user}) => {
  const [show, setShow] = useState(false);

  const handleJoin = (roomName, password) => {
    const pass = password === '' ? null : password
    console.log(`Joining room "${roomName}" with password "${pass}"`);
    socket.emit('join-room-button', roomName, pass, user.username)
    setShow(false);
  };

  const handleCreate = async (roomName, password) => {
    try {
      const pass = password === '' ? null : password
      if (roomName!==''){
        await chatService.createRoom(roomName, pass)
        setShow(false)
        socket.emit('join-room-button', roomName, pass, user.username)
      } else {
        alert('room name missing')
      }
    } catch (e) {
      alert('Room name is already taken')
      console.log(e)
    }
  }

  const onClose = () => {
    setShow(false);
  }

  return (
    <div className='join-create-buttons'>
      <button className="join-room-button" onClick={() => setShow('join')}>Join Room</button>
      <button className="join-room-button" onClick={() => setShow('create')}>Create Room</button>
      {show && <RoomPopup onJoin={handleJoin} onCreate={handleCreate} mode={show} onClose={onClose}/>}
    </div>
  );
}

export default RoomButton;
