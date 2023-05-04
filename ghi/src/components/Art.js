import React, { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const Art = ({
  title,
  image,
  description,
  artist,
  price,
  onClickImage,
  // initialIsLiked,
  // initialLikeCount,
}) => {
  // const [isLiked, setIsLiked] = useState(initialIsLiked || false);
  // const [likeCount, setLikeCount] = useState(initialLikeCount || 0);
  const { token, account_data } = useAuthContext();
  const [likeId, setLikeId] = useState(null);
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);

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

  useEffect(() => {
    fetchId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserData();
      // fetchLikeData();
      // fetchLikeCount();
    }
  }, [token, userId]);

  // const fetchLikeData = async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_USER_SERVICE_API_HOST}/likes?user_id=${userId}&art_id=${artId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       if (data.length > 0) {
  //         setIsLiked(true);
  //         setLikeId(data[0].id);
  //       } else {
  //         setIsLiked(false);
  //         setLikeId(null);
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const fetchLikeCount = async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_USER_SERVICE_API_HOST}/likes/count?art_id=${artId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       setLikeCount(data.count);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const handleLikeButtonClick = async () => {
  //   if (!userData) return;
  //   console.log("User ID:", userId, "Art ID:", artId, "Like ID:", likeId);
  //   if (isLiked) {
  //     const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/likes/${likeId}`;
  //     const response = await fetch(url, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.ok) {
  //       setIsLiked(false);
  //       setLikeCount((count) => count - 1);
  //     }
  //   } else {
  //     const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/likes`;
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         user_id: userId,
  //         art_id: artId,
  //       }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setLikeId(data.id);
  //       setIsLiked(true);
  //       setLikeCount((count) => count + 1);
  //     } else {
  //       console.error("Request failed:", response.status);
  //       const errorData = await response.json();
  //       console.error("Error data:", errorData);
  //     }
  //   }
  // };

  return (
    <div className="">
      <div className="relative">
        <div
          className="grad absolute h-full w-full rounded-b-[1.3rem]"
          onClick={onClickImage}
        ></div>
        <div className="flex">
          <img
            src={image}
            alt=""
            className="object-cover rounded-[1.3rem] sm:h-[16rem] md:h-[14rem] w-full"
          />
          <div className="absolute text-white font-bold bottom-2 left-4 text-[20px] flex items-center gap-2">
            {title}
          </div>
        </div>
      </div>
      <div className="pt-2 flex justify-between items-start">
        <div>
          <p className="max-w-[18rem] font-semibold text-[16px]">
            {description}
          </p>
          <p className="max-w-[18rem] text-[16px] -mt-1 text-gray-500">
            {artist}
          </p>
          <p className="max-w-[18rem] text-[16px]">${price}</p>
        </div>
        {/* <div className="flex items-center space-x-1">
          {isLiked ? (
            <AiFillHeart
              onClick={handleLikeButtonClick}
              className="text-red-500 cursor-pointer"
            />
          ) : (
            <AiOutlineHeart
              onClick={handleLikeButtonClick}
              className="text-red-500 cursor-pointer"
            />
          )}
          <p className="text-[14px]">{likeCount}</p>
        </div> */}
      </div>
    </div>
  );
};

export default Art;
