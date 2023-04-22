import React, { useEffect, useState } from "react";
import AllMyLikes from "./AllMyLikes";

const Like = () => {
  const [likes, setLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = (id) => {
    const revisedLikes = likes.filter(likes => likes.id !== id);
    setLikes(revisedLikes);
  }

  useEffect(() => {
    fetch('http://localhost:8000/likes/')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setLikes(data);
        setIsLoading(false);
      })

  }, []);

  return (

      <div className="like">
        { isLoading && <div>Loading...</div> }
        {likes && <AllMyLikes likes={likes.filter((likes) => likes.liked_by === likes.liked_by.id)} handleDelete={handleDelete}/>}
      </div>
  );
}

export default Like;
