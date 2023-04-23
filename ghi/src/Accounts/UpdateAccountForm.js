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


    const handleDeleteAccount = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_USER_SERVICE_API_HOST}/accounts/${account.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setAccount({});
                handleLogout();
                navigate("/accounts");
            } else {
                console.error("Error deleting account:");
            }
        } catch(error){
            console.error(error)
        }
    };
    
    
//------  Logout on click------
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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                placeholder="Username"
                required
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="user_pic_url" className="sr-only">
                User Picture
              </label>
            <div>
              <label htmlFor="user_pic_url" className="sr-only">
                User Picture
              </label>
              <input
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="user_pic_url"
                value={user_pic_url}
                onChange={(event) => setUser_Pic_Url(event.target.value)}
                placeholder="User Picture (optional)"
                placeholder="User Picture (optional)"
              />
            </div>
            <div>
              <label htmlFor="bio" className="sr-only">
                Bio
              </label>
            <div>
              <label htmlFor="bio" className="sr-only">
                Bio
              </label>
              <input
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="bio"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                placeholder="Bio (optional)"
                placeholder="Bio (optional)"
              />
            </div>
            <div>
              <label htmlFor="zipcode" className="sr-only">
                Zipcode
              </label>
            <div>
              <label htmlFor="zipcode" className="sr-only">
                Zipcode
              </label>
              <input
                type="text"
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="zipcode"
                value={zipcode}
                onChange={(event) => setZipcode(event.target.value)}
                placeholder="Zipcode"
                placeholder="Zipcode"
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
