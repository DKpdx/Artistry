import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import Like from "./Like";

const AllMyLikes = () => {
  const { token } = useContext(AuthContext);
  const [likes, setLikes] = useState([]);


  useEffect(() =>{
    if(token){
      fetchLikedArts(likes);
    }else{
      return;
    }
  },);
}

const fetchLikedArts = async (likes, handleDelete) => {
  // const response = await fetch`${process.env.REACT_APP_USER_SERVICE_API_HOST}/likes',

  return (
    <div className="all-my-likes">
    <h2>All your liked whatevers...</h2>
      {likes.map((likes) => (
      <Like key={likes.id}>
      <button onClick={() => handleDelete(likes.id)}>remove this whatever</button>
      </Like>
  ))}
    </div>
  );
}


export default AllMyLikes;

// artist={likes.user_id}
// art={likes.art_id}
// me={likes.liked_by}
// date={likes.created_at}
