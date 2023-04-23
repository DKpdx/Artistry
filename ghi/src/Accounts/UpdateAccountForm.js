import {
  useAuthContext,
  fetchWithToken,
} from "@galvanize-inc/jwtdown-for-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";

function UpdateAccountForm() {
  const [account, setAccount] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [user_pic_url, setUser_Pic_Url] = useState("");
  const [bio, setBio] = useState("");
  const [zipcode, setZipcode] = useState("");
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
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

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setAccount(data.account);
      setUsername(data.account.username);
      setEmail(data.account.email);
      setUser_Pic_Url(data.account.user_pic_url);
      setBio(data.account.bio);
      setZipcode(data.account.zipcode);
    } else {
      console.log("Error fetching account:", response.status);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.username = username;
    data.email = email;
    data.user_pic_url = user_pic_url;
    data.bio = bio;
    data.zipcode = zipcode;

    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/accounts/${account.id}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      await response.json();
      setAccount([]);
      setUsername("");
      setEmail("");
      setUser_Pic_Url("");
      setBio("");
      setZipcode("");
      fetchAccount();
      handleLogout();
      navigate("/login");
    } else {
      console.error("Error updating account information. Please try again");
    }
  };

  return (
    <>
      <div className="container-fluid d-flex justify-content-center">
        <div className="shadow p-4 mt-4">
          <h1>Update Account Information</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="username"
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                id={id}
                type="text"
                className={`appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${
                  index === 0
                    ? "rounded-t-md"
                    : index === 4
                    ? "rounded-b-md"
                    : ""
                } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                value={value}
                onChange={(event) => setter(event.target.value)}
                placeholder={label}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="user_pic_url"
                value={user_pic_url}
                onChange={(event) => setUser_Pic_Url(event.target.value)}
                placeholder="optional"
              />
              <label htmlFor="user_pic_url">User Picture</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="bio"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                placeholder="optional"
              />
              <label htmlFor="bio">Bio</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="zipcode"
                value={zipcode}
                onChange={(event) => setZipcode(event.target.value)}
                placeholder="zipcode"
              />
              <label htmlFor="zipcode">zipcode</label>
            </div>
            <button onClick={handleLogout}>Update</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateAccountForm;
