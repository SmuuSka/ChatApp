import React, { useRef, useEffect, useState } from "react";
import Message from "./Message";
import ExitRoomButton from "./ExitRoomButton";

const Chats = ({messages, socket, room}) => {

    const [roomUsers, setRoomUsers] = useState([]);

    const chatBoxRef = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
          }, 10);
    }, [messages])

    const onExit = () => {
        socket.emit('leave-room')
    }

    socket.on('get-clients', users => {
        setRoomUsers(users)
    })

    if (messages!==[]){
        return(
            <>
                {room !== null && <p id = "activeUsers">users active in current room: {roomUsers.length}
                    <ExitRoomButton onClick={onExit}/> </p>}
            <div className="chatBOX" ref={chatBoxRef}>
                {/*<RoomCreate/>*/}
                {messages.map(message => <Message key={messages.username} message={message}/>)}

            </div>
            </>
        );
    }
}
export default Chats;
