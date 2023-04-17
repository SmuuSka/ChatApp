import React from "react";

const RoomCreate= () =>{
    return(
        <>
        <div id = "roomCreation">
            <h2 id = "roomNameTitle">Room Name</h2>
            <input id = "roomName" placeholder="Room Name.."/>
            <h2 id = "roomImageTitle">Room's Image</h2>
            <input id = "roomPictureFile" type="file" className="form-control-file" id="exampleFormControlFile1"/>
            <button id = "createRoomButtonConfirm">Create</button>
        </div>
        </>
    );
}
export default RoomCreate;
