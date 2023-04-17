import React from "react";

const Message = () => {
    return(
        <div className="chatMessageColumn">
            <img id="chatMessageImage" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
            <div id="chatMessageDivUserName">
                <p id = "chatMessageUsername">Jussi</p>
                <p id ="chatMessageText">Moromoi</p>
            </div>
            <p id="chatMessageDate">01/02/2055</p>

        </div>
    );
}
export default Message;
