import React, { useState } from 'react';
import chatService from '../services/chatService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes } from '@fortawesome/free-solid-svg-icons';

/**

 Komponentti, joka renderöi huoneen liittymissivun ja huoneen luomissivun.
 @param {Object} props - Komponentin ominaisuudet.
 @param {function} props.onJoin - Funktio, joka käynnistetään, kun käyttäjä liittyy huoneeseen.
 @param {function} props.onCreate - Funktio, joka käynnistetään, kun käyttäjä luo huoneen.
 @param {string} props.mode - Tila, joka määrittää, liittyykö käyttäjä olemassa olevaan huoneeseen vai luo uuden huoneen.
 @param {function} props.onClose - Funktio, joka käynnistetään, kun popup-ikkuna suljetaan.
 @returns {JSX.Element} - Palauttaa huoneen liittymissivun tai huoneen luomissivun.
 */

const RoomPopup = ({ onJoin, onCreate, mode, onClose }) => {

  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');

  /**
   Funktio, joka käynnistetään, kun käyttäjä liittyy olemassa olevaan huoneeseen.
   Käynnistää onJoin-funktion annetuilla argumenteilla ja tyhjentää syötekentät.
   */
  const handleJoin = () => {
    onJoin(roomName, password);
    setPassword('')
    setRoomName('')
  };
  /**
   Funktio, joka käynnistetään, kun käyttäjä luo uuden huoneen.
   Käynnistää onCreate-funktion annetuilla argumenteilla ja tyhjentää syötekentät.
   */
  const handleCreate = () => {
    onCreate(roomName, password)
    setPassword('')
    setRoomName('')
  }
  /**
   Funktio, joka käynnistetään, kun popup-ikkuna suljetaan.
   Käynnistää onClose-funktion.
   */
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

/**
 Komponentti, joka näyttää napit huoneeseen liittymiselle ja huoneen luomiselle.
 @param {Object} props - Ominaisuudet, jotka välitetään komponentille.
 @param {Object} props.socket - WebSocket-yhteyspalvelu.
 @param {Object} props.user - Käyttäjäobjekti.
 @return {JSX.Element} - Palauttaa RoomButton-komponentin.
 */
const RoomButton = ({socket, user}) => {
  const [show, setShow] = useState(false);

/**
  Käsittelee liittymisen huoneeseen.
      @param {string} roomName - Huoneen nimi.
      @param {string} password - Salasana huoneeseen liittymistä varten.
  */

  const handleJoin = (roomName, password) => {
    const pass = password === '' ? null : password
    console.log(`Joining room "${roomName}" with password "${pass}"`);
    socket.emit('join-room-button', roomName, pass, user.username)
    setShow(false);
  };

  /**
   Käsittelee huoneen luomisen.
   @async
   @param {string} roomName - Huoneen nimi.
   @param {string} password - Salasana huoneen luomista varten.
   */

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

  /**
   Käsittelee huoneen liittymis- ja luontipopupin sulkemisen.
   */
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
