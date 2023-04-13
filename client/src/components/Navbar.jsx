const Navbar= () =>{
  return(
      <nav className="chatNavbar">
          <img id ="chatUserImg" src="https://cdn.pixabay.com/photo/2016/12/21/00/36/woman-1921883_960_720.jpg" alt=""/>
          <div className="userNavbar">
        <span id = "chatUserName">Jussi</span>
        <button className="buttonLogout">Logout</button>
          </div>
      </nav>
  );
}
export default Navbar;
