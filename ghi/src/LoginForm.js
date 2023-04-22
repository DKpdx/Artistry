import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    e.target.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h5 className="text-center text-2xl font-bold text-gray-900">
            Login
          </h5>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px mb-3">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                name="username"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <input
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
              type="submit"
              value="login"
            />
          </div>
        </form>
      </div>
    </div>
  );
  //   return (
  //     <div className="card text-bg-light mb-3">
  //       <h5 className="card-header">Login</h5>
  //       <div className="card-body">
  //         <form onSubmit={(e) => handleSubmit(e)}>
  //           <div className="mb-3">
  //             <label className="form-label">Username:</label>
  //             <input
  //               name="username"
  //               type="text"
  //               className="form-control"
  //               onChange={(e) => setUsername(e.target.value)}
  //             />
  //           </div>
  //           <div className="mb-3">
  //             <label className="form-label">Password:</label>
  //             <input
  //               name="password"
  //               type="password"
  //               className="form-control"
  //               onChange={(e) => setPassword(e.target.value)}
  //             />
  //           </div>
  //           <div>
  //             <input className="btn btn-primary" type="submit" value="login" />
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   );
};

export default LoginForm;
