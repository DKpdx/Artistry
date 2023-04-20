import React, { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function AccountDetails() {
  const [account, setAccount] = useState([]);
  // const { token } = useToken();

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

  console.log(account);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="offset-2 col-8">
              <h1 className="text-center">Account Details</h1>
              {account && (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>User Picture</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Bio</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img
                          src={account.user_pic_url}
                          width="200"
                          height="150"
                        ></img>
                      </td>
                      <td>{account.username}</td>
                      <td>{account.email}</td>
                      <td>{account.bio}</td>
                      <td>{account.zipcode}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountDetails;
