import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { BiWorld, BiUser } from "react-icons/bi";
import { FiMenu, FiSearch } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import DarkModeSwitch from "./DarkModeSwitch";

const Navbar = () => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await fetch(`${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`, {
        method: "DELETE",
        credentials: "include",
      });
      setToken(null);
      document.cookie =
        "fastapi_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border-b sticky top-0 z-50 bg-white/[95%] ">
      <div className="flex justify-between items-center sm:px-6 md:px-10 lg:px-12">
        {/* Left */}
        <div className="h-20 flex">
          <img src={logo} className="object-cover" />
        </div>
        {/* Middle */}
        <div className="hidden lg:flex justify-center items-center relative shadow-sm shadow-gray-300 border rounded-full">
          <input
            type="search"
            placeholder=""
            className="py-2.5 w-[20rem] rounded-full outline-0"
          />
          {/* <div className="flex justify-between absolute w-full pr-16 pl-6 font-semibold text-gray-500">
            <button className="w-full">Location</button>
          </div> */}
          <div className="bg-[#ff5a60] p-2 rounded-full mr-2">
            <FiSearch className="text-white w-full" />
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center pr-3 font-semibold text-gray-500">
          <NavLink className="nav-link" to="/arts/new">
            <button>Post Your Art!</button>
          </NavLink>
          <div className="flex items-center border px-4 py-2 rounded-full gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400">
            <NavLink className="navbar-brand" to="/accounts/me">
              {/* <BiUser className="text-[16px]" /> */}
              <button className="">My Account</button>
            </NavLink>
          </div>
          <div className="flex items-center border px-4 py-2 rounded-full gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400">
            <NavLink className="nav-link" to="/login">
              <button>Sign In</button>
            </NavLink>
          </div>
          <div className="flex items-center border px-4 py-2 rounded-full gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400">
            <NavLink className="nav-link" to="/login">
              <button onClick={handleLogout}>Logout</button>
            </NavLink>
          </div>
          <div className="flex items-center border px-4 py-2 rounded-full gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400">
            <NavLink className="nav-link" to="/accounts">
              <button>Create Account</button>
            </NavLink>
          </div>
          <div className="flex items-center border px-4 py-2 rounded-full gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400">
            <NavLink className="nav-link" to="/accounts/id">
              <button>Update Account</button>
            </NavLink>
          </div>
          <DarkModeSwitch />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
