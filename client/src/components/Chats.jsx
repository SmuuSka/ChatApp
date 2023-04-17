
import Message from "./Message";

const Chats = ({messages}) => {

    return(
        <div className="chatBOX">
            {messages.map(message => <Message message={message}/>)}
        </div>
    );
}
export default Chats;
