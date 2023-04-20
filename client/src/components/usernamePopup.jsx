import { useState } from "react";

const UsernamePopup = () => {

    const [tempUsername, setTempUsername] = useState(null)
    const [entered, setEntered] = useState(false);
    
    const setUsername = () => {
        localStorage.setItem('chatUser', JSON.stringify({username: tempUsername, token: 1}))
        setEntered(tempUsername.length > 0)
    }


    if (!entered){
        return (
            <div className="popup">
              <h2>enter your temporary username</h2>
              <label>
                username:
                <input type="text" value={tempUsername} onChange={(e) => setTempUsername(e.target.value)} />
              </label>
              <button onClick={setUsername}>enter</button>
            </div>
        );
    }
}

export default UsernamePopup