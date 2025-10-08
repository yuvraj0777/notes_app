import React from "react";
import { Link, NavLink } from "react-router-dom";
import { HomeIcon, Archive, TrashIcon, StarIcon } from "lucide-react";

const Sidebar = () => {
  const onActivelink = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "orange" : "",
      color: isActive ? "white" : "",
    };
  };
  return (
    <aside className="w-48 p-4 border-r-2 border-gray-200 h-auto">
      <nav className="flex flex-col space-y-2 gap-16">
        <NavLink
          style={onActivelink}
          to="/"
          className="flex gap-2 items-center rounded-r-full p-2 hover:bg-blue-400 hover:text-white "
        >
          <HomeIcon /> <span className="text-2xl font-bold">Home</span>
        </NavLink>
        <NavLink
          style={onActivelink}
          to="/archive"
          className="flex gap-2 items-center rounded-r-full p-2 hover:bg-blue-400 hover:text-white "
        >
          <Archive /> <span className="text-2xl font-bold">Archive</span>
        </NavLink>
        <NavLink
          style={onActivelink}
          to="/important"
          className="flex gap-2 items-center rounded-r-full p-2 hover:bg-blue-400 hover:text-white "
        >
          <StarIcon /> <span className="text-2xl font-bold">Important</span>
        </NavLink>
        <NavLink
          style={onActivelink}
          to="/bin"
          className="flex gap-2 items-center rounded-r-full p-2 hover:bg-blue-400 hover:text-white "
        >
          <TrashIcon /> <span className="text-2xl font-bold">Bin</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
