import react, { useState, useEffect } from "react";

function CreateAccountForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user_pic_url, setUser_Pic_Url] = useState("");
  const [bio, setBio] = useState("");
  const [zipcode, setZipcode] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.username = username;
    data.password = password;
    data.email = email;
    data.user_pic_url = user_pic_url;
    data.bio = bio;
    data.zipcode = zipcode;
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/accounts`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      await response.json();
      setUsername("");
      setPassword("");
      setEmail("");
      setUser_Pic_Url("");
      setBio("");
      setZipcode("");
    } else {
      console.error("Error creating Client; Please try again");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-cream-50 py-12 px-0 sm:px-0 lg:px-0">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create Account
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
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
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
              <div>
                <label htmlFor="user_pic_url" className="sr-only">
                  User Picture
                </label>
                <input
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="user_pic_url"
                  value={user_pic_url}
                  onChange={(event) => setUser_Pic_Url(event.target.value)}
                  placeholder="User Picture (optional)"
                />
              </div>
              <div>
                <label htmlFor="bio" className="sr-only">
                  Bio
                </label>
                <input
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="bio"
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  placeholder="Bio (optional)"
                />
              </div>
              <div>
                <label htmlFor="zipcode" className="sr-only">
                  Zipcode
                </label>
                <input
                  type="text"
                  className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  id="zipcode"
                  value={zipcode}
                  onChange={(event) => setZipcode(event.target.value)}
                  placeholder="Zipcode"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
  // return (
  //     <>
  //     <div className="container-fluid d-flex justify-content-center">
  //         <div className="shadow p-4 mt-4">
  //         <h1>Create Account</h1>
  //         <form onSubmit={handleSubmit}>
  //             <div className="form-floating mb-3">
  //             <input
  //                 type="text"
  //                 className="form-control"
  //                 id="name"
  //                 value={username}
  //                 onChange={(event) => setUsername(event.target.value)}
  //                 required
  //                 placeholder="username"
  //             />
  //             <label htmlFor="username">Username</label>
  //             </div>
  //             <div className="form-floating mb-3">
  //             <input
  //                 type="password"
  //                 className="form-control"
  //                 id="password"
  //                 placeholder="password"
  //                 value={password}
  //                 onChange={(event) => setPassword(event.target.value)}
  //                 required
  //             />
  //             <label htmlFor="password">Password</label>
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
  //             <button className="btn btn-primary">Create</button>
  //         </form>
  //         </div>
  //     </div>
  //     </>
  // );
}

export default CreateAccountForm;
