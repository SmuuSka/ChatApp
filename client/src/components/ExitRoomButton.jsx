import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../cssFiles/Main.css';

function ExitRoomButton({ onClick}) {
  return (
    <button className="exit-room-button" onClick={onClick}>
      <FontAwesomeIcon icon={faSignOutAlt} />
    </button>
  );
}

export default ExitRoomButton;