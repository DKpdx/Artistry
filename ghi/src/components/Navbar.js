import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { BiWorld, BiUser } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="border-b sticky top-0 z-50 bg-white/[95%]">
      <div className="flex justify-between items-center sm:mx-6 md:mx-10 lg:mx-12">
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
          <div className="flex justify-between absolute w-full pr-16 pl-6 font-semibold text-gray-500">
            <button className="w-full">Location</button>
          </div>
          <div className="bg-[#ff5a60] p-2 rounded-full mr-2">
            <FiSearch className="text-white w-full" />
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center pr-3 font-semibold text-gray-500">
          <div className="">
            {/* This needs to have an if or statement, where if user is logged in we can post art, otherwise hide the button */}
            <NavLink className="nav-link text-[18px]" to="/arts">
              Post Your Art!
            </NavLink>
          </div>
          <div className="flex items-center mx-8 gap-1">
            <BiWorld className="text-[18px]" />
            <div className="">EN</div>
          </div>
          <div className="flex items-center border px-4 py-2 rounded-full gap-3 bg-[#ff5a60] text-white font-bold shadow-sm shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out">
            <NavLink className="nav-link" to="/login">
              Log In
            </NavLink>
            <BiUser className="text-[20px]" />
          </div>
          <div className="flex items-center border px-4 py-2 rounded-full gap-3 bg-[#ff5a60] text-white font-bold shadow-sm shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out">
            <NavLink className="nav-link" to="/accounts/new">
              Sign Up
            </NavLink>
            <BiUser className="text-[20px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
