import Input from "./Input";
import Chats from "./Chats";
import React, { useState, useEffect } from "react";
import chatService from "../services/chatService";
import JoinRoomPopup from "./popoutForm";

const Chat = ({socket, user}) => {

    const [messages, setMessages] = useState([])
    const [room, setRoom] = useState(null)

    useEffect(() => {
        chatService.getMessages(room)
        .then(response => {
            console.log(response.data)
            setMessages(response)
        })
        .catch(e => console.log('user has not joined a room or error ocurred'))
    }, [room])

    socket.on('message', message => {
        setMessages(messages.concat(message))
    })

    socket.on('join-room', roomID => {
        setRoom(roomID)
    })

    const renderChat = () => {
        if (room===null){
            return (
                <div className="chat">
                    <JoinRoomPopup />
                </div>
            )
        }
        return (
            <div className="chat">
                <Input socket={socket} room={room} user={user}/>
                <Chats messages={messages} user={user}/>
            </div>
        )
    }
    return renderChat()
}

export default Chat;
