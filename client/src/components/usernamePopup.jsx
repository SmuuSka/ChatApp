import { useState } from "react";
/**
 * Edustaa komponenttia, joka näyttää ponnahdusikkunan, jossa käyttäjää pyydetään syöttämään väliaikainen käyttäjänimi.
 * @param setUser Tämä asettaa vieraille annetun nimen. (Guest name)
 * @returns {JSX.Element} - Palauttaa UsernamePopup-komponentti.
 * */
const UsernamePopup = ({user,setUser }) => {

    const [tempUsername, setTempUsername] = useState(null)
    const [entered, setEntered] = useState(false);

    const setUsername = () => {
        const user = {username: tempUsername, token: 1}
        localStorage.setItem('chatUser', JSON.stringify(user))
        setEntered(tempUsername != null)
        setUser(user)
    }


    if (!entered){
        return (
            <div className="popup">
              <h2>enter temporary username to enter</h2>
              <label>
                username:
                <input type="text" value={tempUsername} onChange={(e) => setTempUsername(e.target.value)} />
              </label>
              <button onClick={() => setUsername()}>enter</button>
            </div>
        );
    }
}

export default UsernamePopup
