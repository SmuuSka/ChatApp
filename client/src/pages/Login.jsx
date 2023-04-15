import BGVIDEO from "../cssFiles/backgroundvid.mp4"
import {useState} from "react";
import React from "react";
import {Route, Routes,Link,redirect} from 'react-router-dom';
import loginService from '../services/loginService';
import Register from "./Register";
const Login = () =>{
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const usernameChange = (event) => {
    setUsername(event.target.value)
    console.log(username)
  }

  const passwordChange = (event) => {
    setPassword(event.target.value)
    console.log(password)
  }

  const onLogin = async (event) => {
    event.preventDefault()
    const credentials = {username: username, password: password}
    try {
      console.log(credentials)
      const response = await loginService.login(credentials)
      redirect("/pages/Home");
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  return(
      <div id = "loginBody" className="formContainerReg">
        <video className="BGVIDEO" src={BGVIDEO} autoPlay loop muted></video>
        <div className = "formWrapperReg" >
          <div className="spanDiv">
          <span className="titleReg">
            <h1>Great Chat</h1>
          </span>
            <span className="logoReg" >
          <img className="RegLogoimg" src="/Icons/Logochat.png"/>
        </span>
          </div>
          <form className="form-group" onSubmit={onLogin}>
            <input id = "loginUsername"  type="text" className="form-control" placeholder="Username/Display Name" onChange={usernameChange}/>
            <input id = "loginPassWord" type="password"  className="form-control" placeholder="Password" onChange={passwordChange}/>
              <button  id = "buttonLogReg" type="button" className="btn btn-primary" onSubmit={onLogin}>Login</button>
            <p>Dont have an account?<Link to="/pages/Register">Register</Link></p>
          </form>
        </div>
      </div>);
}

export default Login;
