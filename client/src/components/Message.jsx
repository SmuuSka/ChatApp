const Message = ({message}) => {
    console.log(message)
    return(
        <div class="message">
            <div class="message-avatar">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="User Avatar"/>
            </div>
            <div class="message-body">
                <div class="message-author">{message.username}</div>
                <div class="message-content">
                    {message.message_content}
                </div>
                <div class="message-time">12:30 PM</div>
            </div>
        </div>
    );
}
export default Message;
