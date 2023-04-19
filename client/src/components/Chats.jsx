import React, { useRef, useEffect } from "react";
import Message from "./Message";
import RoomCreate from "./RoomCreate";

const Chats = ({messages}) => {
    const chatBoxRef = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
          }, 10);
    }, [messages])
    if (messages!==[]){
        return(
            <div className="chatBOX" ref={chatBoxRef}>
                {/*<RoomCreate/>*/}
                {messages.map(message => <Message key={messages.username} message={message}/>)}

            </div>
        );
    }
}
export default Chats;
