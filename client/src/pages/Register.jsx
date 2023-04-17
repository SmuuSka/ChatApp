import BGVIDEO from "../cssFiles/backgroundvid.mp4"
import {useState} from "react";
import registerService from '../services/registerService';
const Register = () =>{

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
    event.preventDefault()
    const credentials = {username: username, password: password}
    console.log(credentials)
    try {
      const response = await registerService.register(credentials);
      console.log(response)
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
          <img className="RegLogoimg" src="Logochat.png"/>
        </span>
          </div>
          <form className="form-group" onSubmit={onRegisterSubmit}>
            <input id = "registerUsername" type="text" className="form-control" placeholder="Username/Display Name" onChange={usernameChange}/>
            <input id = "registerEmail" type="email" className="form-control" placeholder="Email"/>
            <input  id = "registerPassword" type="password"  className="form-control" placeholder="Password" onChange={passwordChange}/>
            {/*<input id = "registerFile" type="file" className="form-control-file" id="exampleFormControlFile1"/>*/}
            <button id = "buttonLogReg" type="submit" className="btn btn-primary">Register</button>
          </form>

        </div>

      </div>
    </>);
}

export default Register;
