import Navbar from "./Navbar";
import Search from "./Search";
import chatService from "../services/chatService";
import React, { useState} from "react";
import RoomButton from "./popoutButtons";

const SideBar= ({socket, user, navigate}) =>{

    const [roomName, setRoomName] = useState('')
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
            <Navbar user={user} navigate={navigate}/>
            <Search socket={socket} user={user}/>
            <RoomButton socket={socket}/>      
        </div>
    );
}
export default SideBar;
