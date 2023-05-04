import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import Art from "./Art";
import LikesList from "./LikesList";

const Profile = ({ match }) => {
  const [view, setView] = useState("posts");
  const [userData, setUserData] = useState(null);
  const [artData, setArtData] = useState(null);
  const [userId, setUserId] = useState("");
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const switchView = () => {
    setView(view === "posts" ? "likes" : "posts");
  };

  useEffect(() => {
    fetchId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserData();
      fetchArtData();
    }
  }, [userId]);

  const handleImageClick = (artId) => {
    navigate(`/arts/${artId}/detail`);
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

  const fetchUserData = async () => {
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
  };

  const fetchArtData = async () => {
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
  };

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
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-4 mb-4"
            onClick={switchView}
          >
            {view === "posts" ? "Show My Likes" : "Show My Posts"}
          </button>
        </div>
      )}
      {view === "posts" && artData && (
        <div className="art-list py-3 sm:py-5">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {artData.map((art) => (
              <div key={art.id} style={{ cursor: "pointer" }}>
                <Art
                  artist={art.username}
                  artistId={art.user_id}
                  artId={art.id}
                  title={art.title}
                  image={art.art_pic_url}
                  description={art.description}
                  price={art.price}
                  onClickImage={() => handleImageClick(art.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {view === "likes" && <LikesList />}
    </div>
  );
};

export default Profile;
