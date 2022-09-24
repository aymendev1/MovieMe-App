import React from "react";
import { BiSearchAlt } from "react-icons/bi";
function SearchBar() {
  return (
    <div>
      <form className="SearchForm" method="POST" action="/post">
        <BiSearchAlt className="iconSearch" />
        <input
          type="text"
          className="SearchInput"
          placeholder="Search for movies or TV series"
          name="querySearch"
        />
      </form>
    </div>
  );
}
export default SearchBar;
