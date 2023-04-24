import Navbar from "./Navbar";
import Search from "./Search";
import chatService from "../services/chatService";
import React, {useState,useEffect} from "react";
import RoomButton from "./popoutButtons";
import OverlayMenu from "./overlayMenu";
import ExitRoomButton from "./ExitRoomButton";

const SideBar= ({socket, user, navigate}) =>{

    const [roomName, setRoomName] = useState('')
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const onRoomNameChange = (event) =>  setRoomName(event.target.value)

    const onCreate = async (event) => {
        event.preventDefault();
        try {
            await chatService.createRoom(roomName)
            console.log('created room');
        } catch (e) {
            console.log('pieleen meni');
            alert('huoneen nimi on jo varattu')
            console.log(e)
        }
    }

    return(
        <div className="sideBarChat">
            <Navbar user={user} navigate={navigate} />
            {isSmallScreen && <OverlayMenu socket={socket} user={user} />}
            {!isSmallScreen && (
                <>
                   
                    <Search socket={socket} user={user} />
                    <RoomButton socket={socket}/>
                    <h4 className="sideTitle">Join Or Create</h4>
                    
                </>
            )}
        </div>
    );
}
export default SideBar;
