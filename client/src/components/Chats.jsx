import React, { useRef, useEffect, useState } from "react";
import Message from "./Message";
import ExitRoomButton from "./ExitRoomButton";
/**
 Komponentti, joka renderöi viestit ja käyttäjien määrän chat-huoneessa.
 @param {Array} messages - Taulukko chat-huoneen viesteistä.
 @param {Object} socket - Socket-yhteys, jota käytetään kommunikointiin palvelimen kanssa.
 @param {string|null} room - Merkkijono, joka sisältää chat-huoneen nimen tai null, jos käyttäjä ei ole minkään chat-huoneen sisällä.
 */
const Chats = ({messages, socket, room}) => {

    /**
     * State-hook, joka sisältää taulukon chat-huoneessa olevista käyttäjistä.
     */
    const [roomUsers, setRoomUsers] = useState([]);

    /**
     * Ref, joka osoittaa viimeisimpään viestiin chat-ikkunassa.
     */

    const chatBoxRef = useRef(null);

    /**
     * Efekti, joka skrollaa chat-ikkunan viimeisimpään viestiin aina kun viestejä päivitetään.
     */

    useEffect(() => {
        setTimeout(() => {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
          }, 10);
    }, [messages])

    /**
     * Funktio, joka kutsutaan kun käyttäjä klikkaa "Poistu huoneesta" -painiketta.
     * Lähettää viestin palvelimelle, joka poistaa käyttäjän chat-huoneesta.
     */

    const onExit = () => {
        socket.emit('leave-room')
    }

    /**
     * Kuuntelija, joka päivittää roomUsers-tilan aina kun palvelimelta tulee uusi lista chat-huoneen käyttäjistä.
     * @param {Array} users - Taulukko chat-huoneessa olevista käyttäjistä.
     */

    socket.on('get-clients', users => {
        setRoomUsers(users)
    })

    /**
     * Jos viestejä on olemassa, renderöidään chat-ikkuna ja käyttäjien määrä.
     */

    if (messages!==[]){
        return(
            <>
                {room !== null && <p id = "activeUsers">users active in current room: {roomUsers.length}
                    <ExitRoomButton onClick={onExit}/> </p>}
            <div className="chatBOX" ref={chatBoxRef}>
                {/*<RoomCreate/>*/}
                {messages.map(message => <Message key={messages.username} message={message}/>)}

            </div>
            </>
        );
    }
}
export default Chats;
