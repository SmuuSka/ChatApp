import React from 'react';
import BGVIDEO from "../cssFiles/backgroundvid.mp4"

const Register = () =>{
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
            <input type="email" className="form-control" placeholder="Email"/>
            <input type="password"  className="form-control" placeholder="Password"/>
            <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
            <button type="button" className="btn btn-primary">Register</button>
          </form>

        </div>

      </div>
    </>);
}

export default Register;
