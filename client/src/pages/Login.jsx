import BGVIDEO from "../cssFiles/backgroundvid.mp4";
import {useState} from "react";
import React from "react";
import {Route, Routes,Link} from 'react-router-dom';
import loginService from '../services/loginService';
import Register from "./Register";

/** Tämä komponentti renderöi kirjautumissivun.
 @param {function} navigate - Funktio, joka navigoi käyttäjän toiselle sivulle.
 */

const Login = ({navigate}) =>{

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  /** Tämä funktio käsittelee muutokset käyttäjänimen syötteessä.
   @param {object} event - Käyttäjänimen syötteestä tuleva event-objekti.
   */
  const usernameChange = (event) => {
    setUsername(event.target.value)
    console.log(username)
  }

  /** Tämä funktio käsittelee muutokset salasanan syötteessä.
   @param {object} event - Salasanan syötteestä tuleva event-objekti.
   */

  const passwordChange = (event) => {
    setPassword(event.target.value)
    console.log(password)
  }

  /** Tämä funktio käsittelee kirjautumistapahtuman.
   @param {object} event - Lomakkeen submit-tapahtumasta tuleva event-objekti.
   */

  const onLogin = async (event) => {
    event.preventDefault()
    try {
      const credentials = {username: username, password: password}
      console.log(credentials)
      const response = await loginService.login(credentials)
      localStorage.setItem('chatUser', JSON.stringify(response.data))
      navigate('/pages/home');
    } catch (e) {
      console.log('login failed wrong user name or password')
      console.log(e)
    }
  }

  return(
      <div id = "loginBody" className="formContainerReg">
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
          <form className="form-group" onSubmit={onLogin}>
            <input id = "loginUsername"  type="text" className="form-control" placeholder="Username/Display Name" onChange={usernameChange}/>
            <input id = "loginPassWord" type="password"  className="form-control" placeholder="Password" onChange={passwordChange}/>
            <button id = "buttonLogReg" type="submit" className="btn btn-primary">Login</button>
            <p>Dont have an account? <Link to="/pages/Register">Register</Link></p>
            or <Link to="/pages/home" >continue</Link> as a guest

          </form>
        </div>
      </div>);
}

export default Login;
