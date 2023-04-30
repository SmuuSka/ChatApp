import Navbar from "./Navbar";
import Search from "./Search";
import React, {useState,useEffect} from "react";
import RoomButton from "./popoutButtons";
import OverlayMenu from "./overlayMenu";
/**
 Komponentti, joka näyttää sivupalkin sisällön.
 @param {object} socket - socket.io -yhteys.
 @param {object} user - käyttäjäobjekti.
 @param {function} navigate - funktio, joka navigoi sovelluksen sivuilla.
 @returns {JSX.Element} - React elementti, joka sisältää sivupalkin.
 */

const SideBar= ({socket, user, navigate}) =>{
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    socket.on('not found', name => {
        alert(`room ${name} not found`)
    })

    return(
        <div className="sideBarChat">
            <Navbar user={user} navigate={navigate} />
            {isSmallScreen && <OverlayMenu socket={socket} user={user} />}
            {!isSmallScreen && (
                <>

                    <Search socket={socket} user={user} />
                    <RoomButton socket={socket} user={user}/>
                    <h4 className="sideTitle">Join Or Create</h4>

                </>
            )}
        </div>
    );
}
export default SideBar;
