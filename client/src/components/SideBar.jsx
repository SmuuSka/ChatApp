import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const SideBar= () =>{
    return(
        <div className="sideBarChat">
            <Navbar/>
            <Chats/>
            <Search/>

        </div>
    );
}
export default SideBar;
