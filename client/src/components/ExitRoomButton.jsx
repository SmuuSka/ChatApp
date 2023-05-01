import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../cssFiles/Main.css';
/**
 Komponentti, joka renderöi ExitRoomButton-napin.
 @param {object} props - React-komponentin propsit.
 @param {function} props.onClick - Funktio, joka suoritetaan napin klikkauksen yhteydessä.
 @return {JSX.Element} ExitRoomButton-komponentin JSX.Element.
 */

function ExitRoomButton({ onClick}) {
  return (
    <button className="exit-room-button" onClick={onClick}>
      <FontAwesomeIcon icon={faSignOutAlt} />
    </button>
  );
}

export default ExitRoomButton;
