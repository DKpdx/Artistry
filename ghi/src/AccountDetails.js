import React, { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function AccountDetails() {
  const [account, setAccount] = useState([]);
  const { token } = useToken();
  const navigate = useNavigate();

  const goToUpdateAccount = () => {
    navigate("/accounts/id");
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
    } else {
      console.log("Error fetching account:", response.status);
    }
  };

  useEffect(() => {
    fetchAccount([]);
  }, [token]);

  console.log(account);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cream-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h5 className="text-center text-2xl font-bold text-gray-900">
            Account Details
          </h5>
        </div>
        {account && (
          <div className="rounded-md shadow-sm -space-y-px mb-3">
            <div className="bg-gray-100 py-2 px-4 rounded-t-md font-semibold">
              User Picture
            </div>
            <div className="py-2 px-4">
              <img
                src={account.user_pic_url}
                alt="User"
                className="w-48 h-32 object-cover rounded"
              />
            </div>
            {[
              { label: "Username", value: account.username },
              { label: "Email", value: account.email },
              { label: "Bio", value: account.bio },
              { label: "Location", value: account.zipcode },
            ].map(({ label, value }) => (
              <React.Fragment key={label}>
                <div className="bg-gray-100 py-2 px-4 font-semibold">
                  {label}
                </div>
                <div className="py-2 px-4">{value}</div>
              </React.Fragment>
            ))}
          </div>
        )}
        <div className="mt-4">
          <button
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            onClick={goToUpdateAccount}
          >
            Update Account
          </button>
        </div>
      </div>
    </div>
  );

  // return (
  //   <>
  //     <div className="container">
  //       <div className="row">
  //         <div className="col">
  //           <div className="offset-2 col-8">
  //             <h1 className="text-center">Account Details</h1>
  //             {account && (
  //               <table className="table table-striped">
  //                 <thead>
  //                   <tr>
  //                     <th>User Picture</th>
  //                     <th>Username</th>
  //                     <th>Email</th>
  //                     <th>Bio</th>
  //                     <th>Location</th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   <tr>
  //                     <td>
  //                       <img
  //                         src={account.user_pic_url}
  //                         width="200"
  //                         height="150"
  //                       ></img>
  //                     </td>
  //                     <td>{account.username}</td>
  //                     <td>{account.email}</td>
  //                     <td>{account.bio}</td>
  //                     <td>{account.zipcode}</td>
  //                   </tr>
  //                 </tbody>
  //               </table>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}

export default AccountDetails;
