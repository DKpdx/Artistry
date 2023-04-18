import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";

function Nav() {
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
      navigate("/Login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info flex justify-between items-center">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Fine Whatever's
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="me-auto mb-2 mb-lg-0">
            <li className="nav-item mr-auto">
              <NavLink className="nav-link" to="/login">
                User Login
              </NavLink>
            </li>
            <li className="nav-item mr-auto">
              <NavLink className="nav-link" to="/accounts">
                Create Account
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
