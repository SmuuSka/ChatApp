import React from "react";
import { useState } from "react";
import chatService from "../services/chatService";
import Picker from 'emoji-picker-react';
/** Komponentti viestikentälle, jossa käyttäjä voi kirjoittaa ja lähettää viestejä.
 @param {Object} props - komponentille annetut ominaisuudet
 @param {Object} props.socket - Socket.io -yhteys
 @param {string} props.room - käyttäjän valitsema huone
 @returns {JSX.Element} - palauttaa Input-komponentin JSX-rakenteen
 */
const Input = ({socket, room}) => {

    /** Alustetaan React-tilamuuttujat uudelle viestille ja tunteikonäppäimistölle */

    const [newMessage, setNewMessage] = useState('')
    const [showPicker, setShowPicker] = useState(false);

    /** Tapahtumankäsittelijä Emoji painikkeen klikkaukselle */
    const onEmojiClick = (event) => {
        console.log(event.emoji)
        setNewMessage(prevInput => prevInput + event.emoji);
    };
    /** Tapahtumankäsittelijä uuden viestin tekstin vaihtumiselle */
    const newMessageChange = (event) => setNewMessage(event.target.value)

    /** Haetaan käyttäjän tiedot local storagessa olevasta tiedosta */
    const user = JSON.parse(localStorage.getItem('chatUser'))

    /** Tapahtumankäsittelijä uuden viestin lähettämiselle */
    const onMessage = async (e) => {

        /** Jos käyttäjä ei ole valinnut huonetta, estetään viestin lähetys ja näytetään virheilmoitus */

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
