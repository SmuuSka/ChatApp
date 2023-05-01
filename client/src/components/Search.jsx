import React, { useState, useEffect } from "react";
import chatService from "../services/chatService";
import getUser from "../services/getUser";
import Room from "./resultRoom";
/**
 * Komponentti hakupalkille, jolla voi etsiä huoneita ja liittyä niihin.
 * @param {Object} socket - Socket.io yhteysobjekti.
 * @returns {JSX.Element} - Renderöi hakupalkin ja huoneiden tulokset.
 */
const Search = ({socket}) => {

    const [roomQuery, setRoomQuery] = useState('')
    const [roomResults, setRoomResults] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(0);
    const [messaged, setMessaged] = useState(false);
    const user = getUser()
    const [showPublic, setShowPublic] = useState(user.token === 1)

    /**
     * Käsittelee hakusanan muutoksen hakupalkissa.
     * @param {Object} event - Hakusanan muutoksen aiheuttanut tapahtuma.
     */
    const onQueryChange = (event) => setRoomQuery(event.target.value);


    useEffect(() => {
        try {
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

    /**
     * Käsittelee huoneeseen liittymisen.
     * Asettaa tilamuuttujan currentRoom uudeksi liityttyä huoneeseen.
     * @param {string} room_id - Huoneen id.
     */
    socket.on('join-room', room_id => {
        setCurrentRoom(room_id);
        console.log('c '+currentRoom)
    })
    /**
     * Käsittelee uuden viestin saapumisen huoneessa.
     * Asettaa tilamuuttujan messaged arvoksi true.
     * @param {Object} message - Uusi viesti.
     */
    socket.on('message', message => {
        setMessaged(true)
    })
    /**
     * Käsittelee huoneesta poistumisen.
     * Asettaa tilamuuttujan currentRoom arvoksi 0.
     */
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
