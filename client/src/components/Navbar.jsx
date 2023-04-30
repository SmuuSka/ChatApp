
/**
 Navbar-komponentti, joka näyttää käyttäjänimen ja login/logout -napit.
 @param {Object} user - Käyttäjäobjekti, joka sisältää käyttäjänimen.
 @param {Function} navigate - Funktio, jolla navigoidaan sivulta toiselle.
 @returns {JSX.Element} - Navbar-elementti.
 */

const Navbar= ({user, navigate}) =>{

    /**
     Kirjautumisnappula.
     @returns {JSX.Element} - Login-nappula.
     */

  const loginButton = () => (
    <button className="buttonLogin" onClick={onLogin}>Login</button>
  )

    /**
     Uloskirjautumisnappula.
     @returns {JSX.Element} - Logout-nappula.
     */

  const logoutButton = () => (
    <button className="buttonLogout" onClick={onLogout}>Logout</button>
  )

    /**
     Kirjaa käyttäjän ulos ja tyhjentää local storagen.
     */

  const onLogout = () => {
    localStorage.clear()
    navigate('/')
  }

    /**
     Siirtää käyttäjän login-sivulle.
     */

  const onLogin = () => {
    navigate('/')
  }

  return(
      <nav className="chatNavbar">
          <img id ="chatUserImg" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt=""/>
          <div className="userNavbar">
            <span id = "chatUserName">{user === null ? 'guest' : user.username}</span>
            {user === null ? loginButton() : logoutButton()}
          </div>
      </nav>
  );
}
export default Navbar;
