import React, { useRef, useEffect, useState } from "react";
import Message from "./Message";
import RoomCreate from "./RoomCreate";
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
            <div className="chatBOX" ref={chatBoxRef}>
                {/*<RoomCreate/>*/}
                {room !== null && <p>users active in current room: {roomUsers.length}</p>}
                <ExitRoomButton onClick={onExit}/>
                
                {messages.map(message => <Message key={messages.username} message={message}/>)}

            </div>
        );
    }
}
export default Chats;
