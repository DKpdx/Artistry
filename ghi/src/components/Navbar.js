import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
// import { FiSearch } from "react-icons/fi";
// import { useContext } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import "./styles.css";

const Navbar = () => {
  const { token, setToken, userId } = useAuthContext();
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
        </div>
        {/* Middle */}
        {/* <div className="hidden lg:flex justify-center items-center relative shadow-sm shadow-gray-300 border rounded-full">
          <input
            type="search"
            placeholder=""
            className="py-2.5 w-[20rem] rounded-full outline-0"
          />
          <div className="bg-orange-500 hover:bg-orange-600 p-2 rounded-full mr-2">
            <FiSearch className="text-white w-full" />
          </div>
        </div> */}
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
          {token && (
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={toggleDropdown}
                >
                  Menu
                  <svg
                    className="-mr-1 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {dropdownOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <NavLink
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-cream-50"
                      role="menuitem"
                      tabIndex="-1"
                      to="/"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Home
                    </NavLink>
                    <NavLink
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-cream-50"
                      role="menuitem"
                      tabIndex="-1"
                      to="/arts/new"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Post Your Art!
                    </NavLink>
                    <NavLink
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-cream-50"
                      role="menuitem"
                      tabIndex="-1"
                      to="/likes"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Create A Like!
                    </NavLink>
                    <NavLink
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-cream-50"
                      role="menuitem"
                      tabIndex="-1"
                      to="/likes/list"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Likes
                    </NavLink>
                    <NavLink
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-cream-50"
                      role="menuitem"
                      tabIndex="-1"
                      to={`/profile/${userId}`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Profile
                    </NavLink>
                    <NavLink
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-cream-50"
                      role="menuitem"
                      tabIndex="-1"
                      to="/accounts/me"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Account
                    </NavLink>
                    <button
                      className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-cream-50"
                      role="menuitem"
                      tabIndex="-1"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
