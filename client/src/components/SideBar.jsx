import Navbar from "./Navbar";
import Search from "./Search";
import chatService from "../services/chatService";
import React, {useState,useEffect} from "react";
import RoomButton from "./popoutButtons";

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
            console.log(e)
        }
    }

    return(
        <div className="sideBarChat">
            <Navbar user={user} navigate={navigate} />
            {isSmallScreen && (
                <>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent15"
                            aria-controls="navbarSupportedContent15" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent15">
                        <Search socket={socket} user={user} />
                        <RoomButton />
                    </div>
                </>
            )}
            {!isSmallScreen && (
                <>
                    <Search socket={socket} user={user} />
                    <RoomButton />
                </>
            )}
        </div>
    );
}
export default SideBar;
