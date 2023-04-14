import React from "react";
const Search = () => {
    return(
        <div className="searchBar">
            <form className="searchForm">
                <h3 id="searchbarTitle">Search for Rooms</h3>
                <input className="searchInput" type="text"  placeholder="Find a Room"/>
            </form>
            <div className="searchFriendChatInfo">
            <img id="searchFriendImage" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt=""/>
                <span id="searchUsername">Room: Perunalaatikko</span>
            </div>
        </div>
    );
}
export default Search;
