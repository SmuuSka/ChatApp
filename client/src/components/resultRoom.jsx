const Room = ({room, socket, currentRoom}) => {
    console.log(currentRoom)

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
            {/*<img id="searchFriendImage" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt=""/>*/}
            <span id="searchUsername">{room.room_name}</span>
            {currentRoom !== room.room_id ? <button  id = "joinRoomButton" onClick={() => onJoin(room.room_id)}>join</button> : <button id="joinRoomButton" onClick={() => onLeave(room.room_id)}>leave</button>}
        </div>
    )
}

export default Room;
