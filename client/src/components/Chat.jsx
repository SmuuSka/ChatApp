import Input from "./Input";
import Chats from "./Chats";
import { useState } from "react";

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
