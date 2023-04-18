import BGVIDEO from "../cssFiles/backgroundvid.mp4"
import React, {useState} from "react";
import registerService from '../services/registerService';
import {Link, redirect, useNavigate} from "react-router-dom";

const Register = ({navigate}) =>{

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

  const onRegisterSubmit = async (event) => {
    event.preventDefault();
    const credentials = {username: username, password: password}
    console.log(credentials)
    try {
      const response = await registerService.register(credentials);
      console.log(response)
      redirect("/pages/Login")
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
            <h1>Great Chat</h1>
          </span>
            <span className="logoReg" >
          <img className="RegLogoimg" src="/Icons/Logochat.png"/>
        </span>
          </div>
          <form className="form-group" onSubmit={onRegisterSubmit}>
            <input id = "registerUsername" type="text" className="form-control" placeholder="Username/Display Name" onChange={usernameChange}/>
            <input id = "registerEmail" type="email" className="form-control" placeholder="Email"/>
            {/*<input  id = "registerPassword" type="password"  className="form-control" placeholder="Password" onChange={passwordChange}/>*/}
            <input id = "registerFile" type="file" className="form-control-file" id="exampleFormControlFile1"/>
              <button id = "buttonLogReg" type="submit" className="btn btn-primary">Register</button>
            <p>Already have an account?<Link to="/">Login</Link></p>
          </form>

        </div>

      </div>
    </>);
}

export default Register;
