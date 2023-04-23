import React, { useRef, useEffect } from "react";
import Message from "./Message";
import RoomCreate from "./RoomCreate";
import ExitRoomButton from "./ExitRoomButton";

const Chats = ({messages, socket}) => {

    const chatBoxRef = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
          }, 10);
    }, [messages])

    const onExit = () => {
        socket.emit('leave-room')
    }
    
    if (messages!==[]){
        return(
            <div className="chatBOX" ref={chatBoxRef}>
                {/*<RoomCreate/>*/}
                <ExitRoomButton onClick={onExit}/>
                {messages.map(message => <Message key={messages.username} message={message}/>)}

            </div>
        );
    }
}
export default Chats;
