import {useEffect, useState} from "react";
import SideBar from "../components/SideBar";
import Chat from "../components/Chat";
import { io } from "socket.io-client";
import chatService from "../services/chatService";
import UsernamePopup from "../components/usernamePopup";

const socketio = io('http://localhost:3003');
/**
 React-komponentti, joka renderöi chat-sovelluksen aloitussivun.
 Komponentti käyttää SideBar- ja Chat-komponentteja näyttääkseen käyttäjän
 käytettävissä olevat huoneet ja avoimet chat-keskustelut.
 Jos käyttäjä ei ole kirjautunut sisään, komponentti renderöi
 UsernamePopup-komponentin käyttäjän kirjautumista varten.
 @param {Object} props - Komponentille annetut ominaisuudet.
 @param {function} props.navigate - Funktio, joka navigoi käyttäjän toiselle sivulle.
 @returns {JSX.Element} Chat-sovelluksen aloitussivun elementti.
 */

const Home = ({navigate}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedUserJSON = localStorage.getItem('chatUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          console.log(user)
          chatService.setToken(user.token)
          socketio.emit('setUsername', user);
        }
    }, [])

    if (user === null) {
        return (
            <UsernamePopup setUser={setUser}/>
        )
    }

    return(
        <div className="home" >
            <div className="container">
            <SideBar socket={socketio} user={user} navigate={navigate}/>
                <Chat socket={socketio} user={user}/>
            </div>

        </div>
    );
}
export default Home;
