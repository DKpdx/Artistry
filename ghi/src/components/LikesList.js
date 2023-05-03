import React, { useEffect, useState } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import Art from "./Art";
import { useNavigate } from "react-router-dom";

function LikesList() {
  const [likes, setLikes] = useState([]);
  const [likedArts, setLikedArts] = useState([]);
  const [userId, setUserId] = useState(null);
  const { token } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
      const response = await fetch(url, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUserId(data.account.id);
      }
    };
    if (token) {
      fetchUserId();
    }
  }, [token]);

  useEffect(() => {
    const fetchLikes = async () => {
      const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/likes/${userId}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data);
      }
    };

    if (token && userId) {
      fetchLikes();
    }
  }, [token, userId]);

  useEffect(() => {
    const fetchLikedArts = async () => {
      const arts = await Promise.all(
        likes.map(async (like) => {
          const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/arts/${like.art_id}`;
          const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            return data;
          }
        })
      );
      const filteredArts = arts.filter((art) => art !== undefined);
      setLikedArts(filteredArts);
    };
    if (token && likes.length > 0) {
      fetchLikedArts();
    }
  }, [token, likes]);

  const handleImageClick = (artId) => {
    navigate(`/arts/${artId}/detail`);
  };

  return (
    <div className="profile-container">
      {likedArts && (
        <div className="art-list py-3 sm:py-5">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {likedArts.map((art) => (
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
    </div>
  );
}

export default LikesList;
