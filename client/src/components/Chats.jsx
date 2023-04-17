
import Message from "./Message";
import RoomCreate from "./RoomCreate";

const Chats = ({messages}) => {
    if (messages!==[]){
        return(
            <div className="chatBOX">
                {/*<RoomCreate/>*/}
                {messages.map(message => <Message key={messages.username} message={message}/>)}
            </div>
        );
    }
}
export default Chats;
