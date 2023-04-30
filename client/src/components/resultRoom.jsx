const Room = ({room, socket, currentRoom}) => {
    /**
     Renderöi huoneen tiedot ja mahdollisuuden liittyä tai poistua huoneesta.
     @param {Object} props - Room-komponentin propsit.
     @param {Object} props.room - Huoneen tiedot, kuten huoneen nimi ja id.
     @param {Object} props.socket - Socket-yhteys.
     @param {string} props.currentRoom - Käyttäjän nykyisen huoneen id.
     @returns {JSX.Element} - Renderöity Room-komponentti.
     */
    const onJoin = (name) => {
        const user = JSON.parse(localStorage.getItem('chatUser')).username
        console.log(`sending emit to room named ${name}!!`)
        socket.emit("join-room", name, user)
    }

    const onLeave = (id) => {
        socket.emit("leave-room", id)
    }


    return (
        <div className="searchFriendChatInfo">
            <span id="searchUsername">{room.room_name}</span>
            {currentRoom !== room.room_id ? <button  id = "joinRoomButton" onClick={() => onJoin(room.room_id)}>join</button> : <button id="joinRoomButton" onClick={() => onLeave(room.room_id)}>leave</button>}
        </div>
    )
}

export default Room;
