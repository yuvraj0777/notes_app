import React from "react";
import logo from "../../assets/note_logo.png";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header>
        <div className="flex w-full h-full border-b-2 border-gray-200 items-center p-4">
          <img src={logo} alt="" className="w-12 h-12" />
          <NavLink to="/">
            <h1 className="text-4xl font-bold">Notezy</h1>
          </NavLink>
        </div>
      </header>
    </>
  );
};

export default Navbar;
