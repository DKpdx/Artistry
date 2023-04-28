import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import Art from "./Art";

const Profile = ({ match }) => {
  const [userData, setUserData] = useState(null);
  const [artData, setArtData] = useState(null);
  const { userId } = useParams();
  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      fetchUserData();
      fetchArtData();
    }
  }, [token]);

  async function fetchUserData() {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVICE_API_HOST}/accounts/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setUserData(data);
  }

  async function fetchArtData() {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVICE_API_HOST}/accounts/${userId}/arts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setArtData(data);
  }

  return (
    <div className="profile-container">
      {userData && (
        <div className="user-info flex flex-col items-center py-8">
          <img
            className="w-32 h-32 rounded-full object-cover"
            src={userData.user_pic_url}
            alt="User profile"
          />
          <h2 className="text-2xl font-semibold mt-4">{userData.username}</h2>
          <p className="text-lg text-gray-600 mt-2">{userData.bio}</p>
        </div>
      )}
      {artData && (
        <div className="art-list py-3 sm:py-5">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {artData.map((art) => (
              <div key={art.id}>
                <Art
                  artist={art.username}
                  artistId={art.user_id}
                  artId={art.id}
                  title={art.title}
                  image={art.art_pic_url}
                  description={art.description}
                  price={art.price}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
