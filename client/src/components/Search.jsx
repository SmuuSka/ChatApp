import React, { useState, useEffect } from "react";
import chatService from "../services/chatService";
import getUser from "../services/getUser";
import Room from "./resultRoom";

const Search = ({socket}) => {
    const [roomQuery, setRoomQuery] = useState('')
    const [roomResults, setRoomResults] = useState([]);
    const user = getUser()
    console.log(user)
    const onQueryChange = (event) => setRoomQuery(event.target.value);

    useEffect(() => {
        if (user === undefined) {
            chatService.getRooms().then(response => {
                setRoomResults(response)
                console.log(roomResults)
            })
        } else {
            chatService.getRecentRooms(user.username).then(response => {
                setRoomResults(response)
                console.log('resp')
                console.log(roomResults)
            })
        }
    }, [])
    
    return(
        <div className="searchBar">
            <div className="searchForm">
                <h4 id="searchbarTitle">Recent rooms</h4>
                <input className="searchInput" type="text"  placeholder="Find a Room" onChange={onQueryChange} value={roomQuery}/>
            </div>
            {roomResults.filter(room => room.room_name.includes(roomQuery)).map(room => <Room room={room} socket={socket}/>)}
        </div>
    );
}
export default Search;
