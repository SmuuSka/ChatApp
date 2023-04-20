const Room = ({room, socket}) => {

    const onJoin = (name) => {
        const user = JSON.parse(localStorage.getItem('chatUser')).username
        console.log(`sending emit to room named ${name}!!`)
        socket.emit("join-room", name, user)
    }

    return (
        <div className="searchFriendChatInfo">
            {/*<img id="searchFriendImage" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt=""/>*/}
            <span id="searchUsername">{room.room_name}</span>
            <button onClick={() => onJoin(room.room_id)}>join</button>
        </div>
    )
}

export default Room;