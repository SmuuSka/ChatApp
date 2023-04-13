import BGVIDEO from "../cssFiles/backgroundvid.mp4"
const Login = () =>{
  return(
    <>
      <div id = "loginBody" className="formContainerReg">
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
            <input id = "loginUsername"  type="text" className="form-control" placeholder="Username/Display Name"/>
            <input id = "loginPassWord" type="password"  className="form-control" placeholder="Password"/>
            <button  id = "buttonLogReg" type="button" className="btn btn-primary">Login</button>
            <p>Dont have an account?

            </p>
          </form>

        </div>

      </div>
    </>);
}

export default Login;
