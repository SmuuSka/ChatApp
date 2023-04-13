const Navbar= () =>{
  return(
      <nav className="chatNavbar">
          <img id ="chatUserImg" src="client/src/pages" alt=""/>
          <div className="userNavbar">
        <span id = "chatUserName">Jussi</span>
        <button className="buttonLogout">Logout</button>
          </div>
      </nav>
  );
}
export default Navbar;
