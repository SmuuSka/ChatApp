import React, { useState, useRef } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../cssFiles/Main.css";
import RoomButton from "./popoutButtons";
import Search from "./Search";

/**
 Komponentti, joka renderöi overlay-menun, joka sisältää nappeja huoneiden liittymistä ja huoneiden luomista varten.
 @param {object} socket - Socket.io -olio kommunikointia varten palvelimen kanssa.
 @param {object} user - Objekti, joka sisältää käyttäjän tiedot, kuten käyttäjänimi.
 @returns {JSX.Element} Overlay-menun React-komponentin.
 */

const OverlayMenu = ({socket, user}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  /**
   Käsittelee napin painalluksen ja vaihtaa overlay-menun näkyvyyttä.
   */
  const handleToggle = () => {
    setShowMenu(!showMenu);
  };

  /**
   Estää sisällön klikkauksen välittymisen overlay-menun ulkopuolelle.
   @param {event} e - Klikkaustapahtuma.
   */

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  /**
   Käsittelee overlay-menun sulkemisen painikkeen painalluksen.
   */

  const handleExitClick = () => {
    setShowMenu(false);
  };

  return (
    <>
      <Navbar bg="light" variant="light">
        <Button  id="bootStrapBurgerButton"variant="outline-dark" onClick={handleToggle}>
          <FontAwesomeIcon icon={faBars} />
        </Button>
      </Navbar>
      <div
        className={`overlay-menu ${showMenu ? "show" : ""}`}
        onClick={handleToggle}
        ref={menuRef}
      >
        <div className="overlay-menu-content" onClick={handleContentClick}>
          <Button id="exitButtoncreateRoom" className="exit-button" variant="link" onClick={handleExitClick}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
            <RoomButton socket={socket}/>
            <Search socket={socket} user={user}/>
        </div>
      </div>
    </>
  );
};

export default OverlayMenu;
