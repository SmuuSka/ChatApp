import BGVIDEO from "../cssFiles/backgroundvid.mp4"
import React, {useState} from "react";
import registerService from '../services/registerService';
import {Link} from "react-router-dom";

/**
 Komponentti, joka näyttää rekisteröintilomakkeen
 @param {object} navigate - React-routerin navigointiobjekti
 @returns {JSX.Element} - Palauttaa JSX-koodin
 */

const Register = ({navigate}) =>{

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  /**
   Funktio, joka käsittelee käyttäjänimen muutokset
   @param {object} event - Event-objekti
   */

  const usernameChange = (event) => {
    setUsername(event.target.value)
    console.log(username)
  }

  /**
   Funktio, joka käsittelee salasanan muutokset
   @param {object} event - Event-objekti
   */
  const passwordChange = (event) => {
    setPassword(event.target.value)
    console.log(password)
  }

  /**
   Funktio, joka käsittelee lomakkeen submit-tapahtuman
   @param {object} event - Event-objekti
   */

  const onRegisterSubmit = async (event) => {
    event.preventDefault();
    const credentials = {username: username, password: password}
    console.log(credentials)
    try {
      const response = await registerService.register(credentials);
      console.log(response)
      navigate("/")
    } catch (e) {
      console.log(e)
    }

  }

  return(
    <>
      <div id = "registerBody" className="formContainerReg">
        <video className="BGVIDEO" src={BGVIDEO} autoPlay loop muted></video>
        <div className = "formWrapperReg" >
          <div className="spanDiv">
          <span className="titleReg">
            <h1>React Chat</h1>
          </span>
            <span className="logoReg" >
          <img className="RegLogoimg" src="/logo512.png"/>
        </span>
          </div>
          <form className="form-group" onSubmit={onRegisterSubmit}>
            <input id = "registerUsername" type="text" className="form-control" placeholder="Username/Display Name" onChange={usernameChange}/>
            {<input  id = "registerPassword" type="password"  className="form-control" placeholder="Password" onChange={passwordChange}/>}
              <button id = "buttonLogReg" type="submit" className="btn btn-primary">Register</button>
            <p>Already have an account?<Link to="/">Login</Link></p>
          </form>

        </div>

      </div>
    </>);
}

export default Register;
