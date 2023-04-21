import React, { useState, useRef } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../cssFiles/Main.css";
import RoomButton from "./popoutButtons";
import Search from "./Search";

const OverlayMenu = ({socket, user}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const handleToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleContentClick = (e) => {
    // Prevent the menu from closing when you click on its content
    e.stopPropagation();
  };

  const handleExitClick = () => {
    setShowMenu(false);
  };

  return (
    <>
      <Navbar bg="light" variant="light">
        <Button variant="outline-dark" onClick={handleToggle}>
          <FontAwesomeIcon icon={faBars} />
        </Button>
      </Navbar>
      <div
        className={`overlay-menu ${showMenu ? "show" : ""}`}
        onClick={handleToggle}
        ref={menuRef}
      >
        <div className="overlay-menu-content" onClick={handleContentClick}>
          <Button className="exit-button" variant="link" onClick={handleExitClick}>
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
