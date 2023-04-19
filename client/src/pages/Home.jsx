import {useEffect, useState} from "react";
import SideBar from "../components/SideBar";
import Chat from "../components/Chat";
import RoomCreate from "../components/RoomCreate";
import { io } from "socket.io-client";
import chatService from "../services/chatService";

const socketio = io('http://localhost:3003');


const Home = ({navigate}) => {

    const [user, setUser] = useState();

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('chatUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          console.log(user)
          chatService.setToken(user.token)
        }
    }, [])

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
