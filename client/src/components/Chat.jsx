import Input from "./Input";
import Chats from "./Chats";
import React, { useState, useEffect } from "react";
import chatService from "../services/chatService";
import ExitRoomButton from "./ExitRoomButton";

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
        console.log('id ' + roomID)
        setRoom(roomID)
    })

    socket.on('leave-room', () => {
        console.log('lol')
        setMessages([])
        setRoom(null)
    })

    return(
        <div className="chat">
            <Chats messages={messages} socket={socket}/>
            <Input socket={socket} room={room}/>
        </div>
    );
}

export default Chat;
