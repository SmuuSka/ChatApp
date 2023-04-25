import React, { useState, useEffect } from "react";
import chatService from "../services/chatService";
import getUser from "../services/getUser";
import Room from "./resultRoom";

const Search = ({socket}) => {

    const [roomQuery, setRoomQuery] = useState('')
    const [roomResults, setRoomResults] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(0);
    const [messaged, setMessaged] = useState(false);
    const [showPublic, setShowPublic] = useState(false)
    const user = getUser()
    const onQueryChange = (event) => setRoomQuery(event.target.value);

    useEffect(() => {
        try {
            setShowPublic(user.token === 1)
            if (showPublic) {
                chatService.getPublicRooms().then(response => {
                    setRoomResults(response)
                })
            } else {
                chatService.getRecentRooms(user.username).then(response => {
                    setRoomResults(response)
                })
            }
        }
        catch (e) {
            console.log(e)
        }
    }, [messaged, showPublic, user.token, user.username])

    socket.on('join-room', room_id => {
        setCurrentRoom(room_id);
        console.log('c '+currentRoom)
    })

    socket.on('message', message => {
        setMessaged(true)
    })

    socket.on('leave-room', () => {
        setCurrentRoom(0)
    })
    
    return(
        <div className="searchBar">
            <div className="searchForm">
                {user.token === 1 ? <h4 id="searchbarTitle">Public Rooms</h4> : <h4 id="searchbarTitle">Recent rooms</h4>}
                <input className="searchInput" type="text"  placeholder="Find a Room" onChange={onQueryChange} value={roomQuery}/>
            </div>
            {roomResults.filter(room => room.room_name
            .includes(roomQuery))
            .map(room => <Room room={room} socket={socket} currentRoom={currentRoom}/>)}
        </div>
    );
}
export default Search;
