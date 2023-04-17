import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const SideBar= ({socket}) =>{
    return(
        <div className="sideBarChat">
            <Navbar/>
            <Search socket={socket}/>

        </div>
    );
}
export default SideBar;
