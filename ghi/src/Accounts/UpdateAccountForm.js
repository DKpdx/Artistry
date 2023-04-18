import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";

function UpdateAccountForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [user_pic_url, setUser_Pic_Url] = useState("");
    const [bio, setBio] = useState("");
    const [zipcode, setZipcode] = useState("");
    const { token } = useAuthContext();

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const data = {};
        data.username = username;
        data.email = email;
        data.user_pic_url = user_pic_url;
        data.bio = bio;
        data.zipcode = zipcode;

        const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/accounts/${user.id}`;
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok){
            await response.json();
            setUsername("");
            setEmail("");
            setUser_Pic_Url("");
            setBio("");
            setZipcode("");
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
                    type="text"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="email"
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
                <button className="btn btn-primary">Update</button>
            </form>
            </div>
        </div>
        </>
    );
}

export default UpdateAccountForm;
