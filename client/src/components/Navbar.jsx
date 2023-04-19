const Navbar= ({user, navigate}) =>{

  const loginButton = () => (
    <button className="buttonLogin" onClick={onLogin}>Login</button>
  )
  
  const logoutButton = () => (
    <button className="buttonLogout" onClick={onLogout}>Logout</button>
  )
  
  const onLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  const onLogin = () => {
    navigate('/')
  }

  return(
      <nav className="chatNavbar">
          <img id ="chatUserImg" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt=""/>
          <div className="userNavbar">
            <span id = "chatUserName">{user === undefined ? 'guest' : user.username}</span>
            {user === undefined ? loginButton() : logoutButton()}
          </div>
      </nav>
  );
}
export default Navbar;
