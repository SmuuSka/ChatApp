const Navbar= () =>{
  return(
    <nav>
      <span className = "logoNavbar">Great Chat</span>
      <div className="userNavbar">
        <img src="client/src/pages" alt=""/>
        <span>Jussi</span>
        <button>Logout</button>
      </div>
    </nav>
  );
}
export default Navbar;
