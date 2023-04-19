import React from "react";
import { useState } from "react";
import chatService from "../services/chatService";

const Input = ({socket, room, user}) => {

    const [newMessage, setNewMessage] = useState('')
    const newMessageChange = (event) => setNewMessage(event.target.value)
    console.log('time:' + new Date().toUTCString())

    const onMessage = async (e) => {
        e.preventDefault()
        console.log(newMessage)
        const message = {roomID: room, content: newMessage, from: user.username, time: new Date().getTime()}
        socket.emit('message', newMessage, user.username);
        setNewMessage('')
        try {
            chatService.postMessage(message)
        } catch (e) {
            console.log(e)
        }

    }

    return(
        <div class="input-field">
            <form onSubmit={onMessage}>
                <input  className="chatTextInput" type="text" placeholder="Kirjoita viesti..." onChange={newMessageChange} value={newMessage}/>
                <button id = "chatSendMessageButton"type="submit">Lähetä</button>
            </form>
        </div>
    );
}
export default Input;
