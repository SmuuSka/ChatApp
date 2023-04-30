import Input from "./Input";
import Chats from "./Chats";
import React, { useState, useEffect } from "react";
import chatService from "../services/chatService";

/**
 Komponentti Chat, joka renderöi chat-ikkunan ja hallitsee viestien ja huoneen tilaa
 @param {Object} socket - Socket.io -yhteyskomponentti
 @returns {JSX.Element} Chat -komponentin JSX.Element -olio
 */

const Chat = ({socket, user}) => {

    /**
     React-tila, joka säilyttää viestit
     @type {[Object[], function]} - Tuple, joka sisältää taulukon viesteistä ja funktion viestitilan asettamiseksi
     */
    const [messages, setMessages] = useState([])

    /**
     React-tila, joka säilyttää huoneen tiedot
     @type {[string|null, function]} - Tuple, joka sisältää merkkijonon huoneen ID:stä ja funktion huonetilan asettamiseksi
     */

    const [room, setRoom] = useState(null)

    /**
     React-efekti, joka hakee viestit huoneesta, kun huoneen tila muuttuu
     */

    useEffect(() => {
        chatService.getMessages(room)
        .then(response => {
            setMessages(response)
        })
        .catch(e => console.log(e))
    }, [room])

    /**
     Event handler, joka asettaa uuden viestin viestitilaan, kun uusi viesti vastaanotetaan socket-yhteydellä
     @param {Object} message - Uusi viesti
     */

    socket.on('message', message => {
        setMessages(messages.concat(message))
    })

    /**
     Event handler, joka asettaa huonetilan uudelleen, kun käyttäjä liittyy uuteen huoneeseen
     @param {string} roomID - Uuden huoneen ID
     */

    socket.on('join-room', roomID => {
        console.log('id ' + roomID)
        setRoom(roomID)
        socket.emit('get-clients', roomID)
    })

    /**
     Event handler, joka tyhjentää viestit ja huonetilan, kun käyttäjä poistuu huoneesta
     */

    socket.on('leave-room', () => {
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
