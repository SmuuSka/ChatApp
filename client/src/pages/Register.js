import BGVIDEO from "../cssFiles/backgroundvid.mp4"
const Register = () =>{
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
          <form className="form-group">
            <input id = "registerUsername" type="text" className="form-control" placeholder="Username/Display Name"/>
            <input id = "registerEmail" type="email" className="form-control" placeholder="Email"/>
            <input  id = "registerPassword" type="password"  className="form-control" placeholder="Password"/>
            <input id = "registerFile" type="file" className="form-control-file" id="exampleFormControlFile1"/>
            <button id = "buttonLogReg" type="button" className="btn btn-primary">Register</button>
          </form>

        </div>

      </div>
    </>);
}

export default Register;
