import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

function UpdateAccountForm() {
  const [account, setAccount] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [user_pic_url, setUser_Pic_Url] = useState("");
  const [bio, setBio] = useState("");
  const [zipcode, setZipcode] = useState("");

  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [accountUpdated, setAccountUpdated] = useState(false);
  const [userId, setUserId] = useState("");

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_USER_SERVICE_API_HOST}/accounts/${account.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setAccount({});
        handleLogout();
        navigate("/accounts");
      } else {
        console.error("Error deleting account:");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`, {
        method: "DELETE",
        credentials: "include",
      });
      setToken(null);
      document.cookie =
        "fastapi_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAccount = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/accounts/${userId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setAccount(data);
      setUsername(data.username);
      setEmail(data.email);
      setUser_Pic_Url(data.user_pic_url);
      setBio(data.bio);
      setZipcode(data.zipcode);
    } else {
      console.log("Error fetching account:", response.status);
    }
  };

  const fetchId = async () => {
    try {
      const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
      const fetchConfig = {
        credentials: "include",
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const data = await response.json();
        setUserId(data.account.id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchAccount();
    }
  }, [userId, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username,
      email,
      user_pic_url,
      bio,
      zipcode,
    };

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
      setAccount({});
      setUsername("");
      setEmail("");
      setUser_Pic_Url("");
      setBio("");
      setZipcode("");
      setAccountUpdated(true);
      navigate(`/profile/${account.id}`);
    } else {
      console.error("Error updating account information. Please try again");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-cream-50  py-12 px-0 sm:px-0 lg:px-0">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Update Account
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="user_pic_url"
                  value={user_pic_url}
                  onChange={(event) => setUser_Pic_Url(event.target.value)}
                  placeholder="Picture URL"
                />
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="bio"
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  placeholder="Bio"
                />
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border rounded-b-md border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="zipcode"
                  value={zipcode}
                  onChange={(event) => setZipcode(event.target.value)}
                  placeholder="zipcode"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>
          </form>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdateAccountForm;
