import Input from "./Input";
import Chats from "./Chats";
import React, { useState } from "react";
import RoomCreate from "./RoomCreate";

const Chat = ({socket}) => {

    const [messages, setMessages] = useState([])

    socket.on('message', message => {
        setMessages(messages.concat(message))
    })

    return(
        <div className="chat">
            <Input socket={socket}/>
            <Chats messages={messages}/>
        </div>
    );
}

export default Chat;
