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
            setMessages(response)
        })
        .catch(e => console.log(e))
    }, [room])


    socket.on('message', message => {
        setMessages(messages.concat(message))
    })


    socket.on('join-room', roomID => {
        console.log('id ' + roomID)
        setRoom(roomID)
        socket.emit('get-clients', roomID)
    })

    socket.on('leave-room', () => {
        console.log('lol')
        setMessages([])
        setRoom(null)
    })

    return(
        <div className="chat">
            <Chats messages={messages} socket={socket} room={room}/>
            <Input socket={socket} room={room}/>
        </div>
    );
}

export default Chat;
