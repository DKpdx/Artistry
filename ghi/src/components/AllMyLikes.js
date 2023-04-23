import React, { useEffect, useState, useContext, useCallback } from "react";
import ArtsContext from "./ArtsContext";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import Art from "./Art";

const AllMyLikes = () => {
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState([]);
  const [filteredArts, setFilteredArts] = useState([]);
  const arts = useContext(ArtsContext);


  const handleDelete = (id) => {
    const revisedLikes = likes.filter((likes) => likes.id !== id);
    setLikes(revisedLikes);
  };

  const fetchLikes = useCallback(async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/likes`;
    const fetchConfig = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, fetchConfig);
      if (!response.ok) {
        throw new Error("Fetch likes failed.");
      }

      const data = await response.json();
      setIsLoading(false);
      setLikes(data);

    } catch (error) {
      console.error("Error fetching likes data: ", error);
    }
}, [token]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const filterArts = useCallback(() => {
    const likedArts = arts.filter((art) =>
    likes.some((like) => like.art_id === art.id)
    );
    setFilteredArts(likedArts);
  }, [arts, likes]);

  useEffect(() => {
    filterArts();
  }, [arts, likes, filterArts]);

  return (
    <div className="py-3 sm:py-5 ">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {isLoading && <div>Loading...</div>}
        {filteredArts.map((art) => (
          <Art
            key={art.id}
            artist={art.user_id}
            title={art.title}
            image={art.art_pic_url}
            description={art.description}
            price={art.price}
          />
          ))}
            <button
            onClick={handleDelete}>remove this whatever
            </button>
        </div>
      </div>
  );
};

export default AllMyLikes;
