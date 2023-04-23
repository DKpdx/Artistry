import {
  useAuthContext,
  fetchWithToken,
} from "@galvanize-inc/jwtdown-for-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateAccountForm() {
  const [account, setAccount] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [user_pic_url, setUser_Pic_Url] = useState("");
  const [bio, setBio] = useState("");
  const [zipcode, setZipcode] = useState("");
  const { token } = useAuthContext();
  const navigate = useNavigate();

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
    } else {
      console.log("Error fetching account:", response.status);
    }
  };
  useEffect(() => {
    fetchAccount();
  }, []);

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
      navigate("/accounts/me");
    } else {
      console.error("Error updating account information. Please try again");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h5 className="text-center text-2xl font-bold text-gray-900">
            Update Account Information
          </h5>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px mb-3">
            {[
              {
                id: "username",
                label: "Username",
                value: username,
                setter: setUsername,
              },
              { id: "email", label: "Email", value: email, setter: setEmail },
              {
                id: "user_pic_url",
                label: "User Picture",
                value: user_pic_url,
                setter: setUser_Pic_Url,
              },
              { id: "bio", label: "Bio", value: bio, setter: setBio },
              {
                id: "zipcode",
                label: "Zipcode",
                value: zipcode,
                setter: setZipcode,
              },
            ].map(({ id, label, value, setter }, index) => (
              <div key={id}>
                <label htmlFor={id} className="sr-only">
                  {label}
                </label>
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
              </div>
            ))}
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  // return (
  // <>
  //     <div className="container-fluid d-flex justify-content-center">
  //         <div className="shadow p-4 mt-4">
  //         <h1>Update Account Information</h1>
  //         <form onSubmit={handleSubmit}>
  //             <div className="form-floating mb-3">
  //             <input
  //                 type="text"
  //                 className="form-control"
  //                 id="name"
  //                 value={username}
  //                 onChange={(event) => setUsername(event.target.value)}
  //                 placeholder="username"
  //             />
  //             <label htmlFor="username">Username</label>
  //             </div>
  //             <div className="form-floating mb-3">
  //             <input
  //                 type="text"
  //                 className="form-control"
  //                 id="email"
  //                 value={email}
  //                 onChange={(event) => setEmail(event.target.value)}
  //                 placeholder="email"
  //             />
  //             <label htmlFor="email">Email</label>
  //             </div>
  //             <div className="form-floating mb-3">
  //             <input
  //                 type="text"
  //                 className="form-control"
  //                 id="user_pic_url"
  //                 value={user_pic_url}
  //                 onChange={(event) => setUser_Pic_Url(event.target.value)}
  //                 placeholder="optional"
  //             />
  //             <label htmlFor="user_pic_url">User Picture</label>
  //             </div>
  //             <div className="form-floating mb-3">
  //             <input
  //                 type="text"
  //                 className="form-control"
  //                 id="bio"
  //                 value={bio}
  //                 onChange={(event) => setBio(event.target.value)}
  //                 placeholder="optional"
  //             />
  //             <label htmlFor="bio">Bio</label>
  //             </div>
  //             <div className="form-floating mb-3">
  //             <input
  //                 type="text"
  //                 className="form-control"
  //                 id="zipcode"
  //                 value={zipcode}
  //                 onChange={(event) => setZipcode(event.target.value)}
  //                 placeholder="zipcode"
  //             />
  //             <label htmlFor="zipcode">zipcode</label>
  //             </div>
  //             <button className="btn btn-primary">Update</button>
  //         </form>
  //         </div>
  //     </div>
  //     </>
  // );
}

export default UpdateAccountForm;
