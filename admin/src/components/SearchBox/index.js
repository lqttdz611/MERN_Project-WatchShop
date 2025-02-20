import React from "react";
import Button from "@mui/material/Button";
import { PiHandSwipeLeftBold } from "react-icons/pi";
import { VscSearch } from "react-icons/vsc";

const SearchBox = () => {
  return (
    <>
      <div className="searchBox position-relative d-flex align-items-center">
        
        <VscSearch /> &nbsp;
        <input type="text" placeholder="Search here..."></input>
      </div>
    </>
  );
};

export default SearchBox;
