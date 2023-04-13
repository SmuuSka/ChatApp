import axios from "axios";
import React from 'react';
import BGVIDEO from "../cssFiles/backgroundvid.mp4"

const Login = () =>{
  return(
    <>
      <div className="formContainerReg">
        <video className="BGVIDEO" src={BGVIDEO} autoPlay loop muted></video>
        <div className = "formWrapperReg" >
          <div className="spanDiv">
          <span className="titleReg">
            <h1>Great Chat</h1>
          </span>
            <span className="logoReg" >
          <img className="RegLogoimg" src="Logochat.png"/>
        </span>
          </div>
          <form className="form-group">
            <input type="text" className="form-control" placeholder="Username/Display Name"/>
            <input type="password"  className="form-control" placeholder="Password"/>
            <button type="button" className="btn btn-primary">Login</button>
            <p>Dont have an account?

            </p>
          </form>

        </div>

      </div>
    </>);
}

export default Login;


