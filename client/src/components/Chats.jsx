
import Message from "./Message";
import RoomCreate from "./RoomCreate";

const Chats = ({messages}) => {

    return(
        <div className="chatBOX">
            <RoomCreate/>
            {messages.map(message => <Message message={message}/>)}
        </div>
    );
}
export default Chats;
