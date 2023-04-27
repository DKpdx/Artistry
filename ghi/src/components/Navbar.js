import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FiSearch } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
<<<<<<< HEAD
import AllMyLikes from './AllMyLikes';
=======
import "./styles.css";
>>>>>>> main

const Navbar = () => {
  const { token, setToken } = useContext(AuthContext);
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

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="border-b sticky top-0 z-50 bg-white/[95%] ">
      <div className="flex justify-between items-center sm:px-6 md:px-10 lg:px-12">
        {/* Left */}
<<<<<<< HEAD
        <div className="h-20 flex">
          <img src={logo} alt="" className="object-cover" />
=======
        <div className="h-24 w-24 flex items-center">
          <NavLink to="/">
            <div className="">
              <img
                alt="picture_lol"
                src={logo}
                className="w-auto h-auto object-contain"
              />
            </div>
          </NavLink>
>>>>>>> main
        </div>
        {/* Middle */}
        <div className="hidden lg:flex justify-center items-center relative shadow-sm shadow-gray-300 border rounded-full">
          <input
            type="search"
            placeholder=""
            className="py-2.5 w-[20rem] rounded-full outline-0"
          />
          <div className="bg-[#ff5a60] p-2 rounded-full mr-2">
            <FiSearch className="text-white w-full" />
          </div>
        </div>
        {/* Right */}
        <div className="flex items-center pr-3 font-semibold text-gray-500">
          <div className="flex">
            {!token ? (
              <NavLink className="nav-link mr-4" to="/login">
                Sign In
              </NavLink>
            ) : (
              <button className="nav-link mr-4" onClick={handleLogout}>
                Logout
              </button>
            )}
            {!token && (
              <NavLink className="nav-link mr-4" to="/accounts">
                Create Account
              </NavLink>
            )}
          </div>
<<<<<<< HEAD
          <div className="flex items-center border px-4 py-2 rounded-full gap-3 bg-[#ff5a60] text-white font-bold shadow-sm shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out">
            <NavLink className="nav-link" to="/likes">
              <button>My Likes</button>
            </NavLink>
          </div>
=======
          {token && (
            <div className="relative">
              <button
                className="flex items-center border px-4 py-2 rounded-full gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
                onClick={toggleDropdown}
              >
                Menu
              </button>
              {dropdownOpen && (
                <div className="dropdown absolute right-0 mt-2">
                  <div className="dropdown-content">
                    <NavLink className="dropdown-item" to="/">
                      Home
                    </NavLink>
                    <NavLink className="dropdown-item" to="/arts/new">
                      Post Your Art!
                    </NavLink>
                    <NavLink className="dropdown-item" to="/likes">
                      Create A Like!
                    </NavLink>
                    <NavLink className="dropdown-item" to="/likes/list">
                      My Likes
                    </NavLink>
                    <NavLink className="dropdown-item" to="/accounts/me">
                      My Account
                    </NavLink>
                    {!token && (
                      <NavLink className="dropdown-item" to="/accounts">
                        Create Account
                      </NavLink>
                    )}
                    {!token ? (
                      <NavLink className="dropdown-item" to="/login">
                        Sign In
                      </NavLink>
                    ) : (
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
>>>>>>> main
        </div>
      </div>
    </div>
  );
};
export default Navbar;
