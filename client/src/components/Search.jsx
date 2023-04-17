import React, { useState, useEffect } from "react";
import chatService from "../services/chatService";
import Room from "./resultRoom";

const Search = ({socket}) => {
    const [roomQuery, setRoomQuery] = useState('')
    const [roomResults, setRoomResults] = useState([]);

    const onQueryChange = (event) => setRoomQuery(event.target.value);

    useEffect(() => {
        chatService.getRooms().then(response => {
            setRoomResults(response)
        })
    }, [])
    
    return(
        <div className="searchBar">
            <div className="searchForm">
                <h3 id="searchbarTitle">Search for Rooms</h3>
                <input className="searchInput" type="text"  placeholder="Find a Room" onChange={onQueryChange} value={roomQuery}/>
                <button id = "createRoomButton">Create a Room</button>
            </div>
            {roomResults.filter(room => room.room_name.includes(roomQuery)).map(room => <Room room={room} socket={socket}/>)}
        </div>
    );
}
export default Search;
