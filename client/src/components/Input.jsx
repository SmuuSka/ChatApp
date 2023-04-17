import React from "react";
import { useState } from "react";

const Input = ({socket}) => {

    const [newMessage, setNewMessage] = useState('')
    const newMessageChange = (event) => setNewMessage(event.target.value)

    const onMessage = () => {
        console.log(newMessage)
        socket.emit('message', newMessage);
        setNewMessage('')
    }

    return(
        <div class="input-field">
            <input  className="chatTextInput" type="text" placeholder="Kirjoita viesti..." onChange={newMessageChange} value={newMessage}/>
            <button id = "chatSendMessageButton"type="submit" onClick={onMessage}>Lähetä</button>
        </div>
    );
}
export default Input;
