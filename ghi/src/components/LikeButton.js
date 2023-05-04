import React, { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import heartEmpty from "../assets/heartEmpty.png";
import heartFull from "../assets/heartFull.png";

const LikeButton = ({ artId, artistId }) => {
  const { token } = useAuthContext();
  const [liked, setLiked] = useState(false);
  const [likedBy, setLikedBy] = useState("");
  const [likeId, setLikeId] = useState(null);

  const fetchAccount = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      if (data.account) {
        setLikedBy(data.account.id);
      }
    } else {
      console.log("Error fetching account:", response.status);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!likedBy) return;

      const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/likes/${likedBy}`;
      const fetchConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched likes data:", data);

          if (data.likes && data.likes.length > 0) {
            const like = data.likes.find((likes) => likes.art_id === artId);
            if (like) {
              console.log("Like object:", like);
              console.log("Like ID:", like.id);
              setLiked(true);
              setLikeId(like.id);
            }
          }
        } else {
          console.log("Unable to fetch like status!", response.status);
        }
      } catch (error) {
        console.log("Network or parsing error with status fetch:", error);
      }
    };
    fetchLikeStatus();
  }, [likedBy, artId, token]);

  const handleClick = useCallback(
    async (e) => {
      e.stopPropagation();
      e.preventDefault();

      console.log("Liked status:", liked); // Debugging
      console.log("Like ID:", likeId); // Debugging

      const method = liked ? "DELETE" : "POST";
      const queryParams = liked ? `/${likeId}` : "";
      const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/likes${queryParams}`;

      const fetchConfig = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      if (!liked) {
        fetchConfig.body = JSON.stringify({
          user_id: artistId,
          art_id: artId,
          liked_by: likedBy,
          created_at: new Date().toISOString(),
        });
      }

      try {
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
          if (!liked) {
            const data = await response.json();
            console.log("Like response data:", data);
            setLikeId(data.id);
          } else {
            setLikeId(null);
          }
          setLiked(!liked);
          console.log(liked ? "No Like" : "You Like");
        } else {
          console.log("Unable to perform action on art");
        }
      } catch (error) {
        console.log("Some sort of network or parsing error occurred", error);
      }
    },
    [liked, likeId, token, artistId, artId, likedBy]
  );

  return (
    <button
      className="like-button"
      onClick={handleClick}
      disabled={!token}
      title={!token ? "You must log in to like!" : ""}
    >
      {liked ? (
        <img
        src={heartFull}
        alt="Like"
        // style={{ transform: "scale(0.5)" }}
        />
      )
      :
      (
        <img
          src={heartEmpty}
          alt="No Like"
          // style={{ transform: "scale(0.5)" }}
        />
      )}
    </button>
  );
};

export default LikeButton;
