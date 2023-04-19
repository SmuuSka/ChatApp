import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import chatService from "../services/chatService";
import React, { useState, useEffect } from "react";


const SideBar= ({socket}) =>{

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
            <Navbar/>
            <Search socket={socket}/>
            <form onSubmit={onCreate}>
                <input placeholder="room name" value={roomName} onChange={onRoomNameChange}/>
                <button id = "createRoomButton">Create a Room</button>
            </form>
        </div>
    );
}
export default SideBar;
