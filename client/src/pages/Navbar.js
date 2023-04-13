import React, {Suspense} from 'react';
const Navbar= () =>{
  return(
    <nav>
      <span className = "logo">Great Chat</span>
      <div className="user">
        <img src="" alt=""/>
        <span>Jussi</span>
        <button>Logout</button>
      </div>
    </nav>);
}
export default Navbar;
