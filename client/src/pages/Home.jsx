import React from "react";
import SideBar from "../components/SideBar";
import Chat from "../components/Chat";

import { io } from "socket.io-client";
const socketio = io('http://localhost:3003');

const Home = () => {
    return(
        <div className="home" >Home
            <div className="container">
            <SideBar/>
                <Chat socket={socketio}/>
            </div>

        </div>
    );
}
export default Home;
