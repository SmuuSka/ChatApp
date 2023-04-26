import React from "react";
import { useState } from "react";
import chatService from "../services/chatService";
import Picker from 'emoji-picker-react';
const Input = ({socket, room}) => {
    const [newMessage, setNewMessage] = useState('')
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (event) => {
        setNewMessage(prevInput => prevInput + event.emoji);
    };
    const newMessageChange = (event) => setNewMessage(event.target.value)
    const user = JSON.parse(localStorage.getItem('chatUser'))

    const onMessage = async (e) => {
        if (room === null){
            return alert('you need to be in room to send a message')
        }
        e.preventDefault()
        console.log(newMessage)
        const message = {roomID: room, content: newMessage, from: user.username, time: new Date().toLocaleString('sv-SE')}
        console.log(message)
        socket.emit('message', message);
        setNewMessage('')
        try {
            chatService.postMessage(message)
        } catch (e) {
            console.log(e)
        }

    }

    return(
        <div class="input-field">
            <form  onSubmit={onMessage}>
                <div id="chatInputBox">
                    <input  className="chatTextInput" type="text" placeholder="Kirjoita viesti..." onChange={newMessageChange} value={newMessage}/>
                    <div className="btn-group dropup">
                        <a className="btn dropdown-toggle" role="button" id="dropdownMenu"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                           onClick={() => setShowPicker(val => !val)}>
                            😂
                        </a>
                        <div className="dropdown-menu">
                            {showPicker && <Picker
                                onEmojiClick={onEmojiClick} />}
                        </div>
                    </div>
                    <button  id = "chatSendMessageButton"type="submit"><img id = "chatSendMessageButtonImg" src="https://cdn.pixabay.com/photo/2014/06/15/22/29/message-369540_960_720.png"/></button>
                </div>
            </form>

        </div>
    );

}

export default Input;
