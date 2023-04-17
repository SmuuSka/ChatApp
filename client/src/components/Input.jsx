import React from "react";
const Input = () => {
    return(
        <div className="chatTextInput">
        <input id = "inputSendChatText"/>
            <button id = "emojiButton">E</button>
            <button id = "gifButton">G</button>
        </div>
    );
}
export default Input;
