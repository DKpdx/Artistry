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
  console.log("Arts data:", arts);


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
      console.log('Fetched likes data:', data);
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
    if (arts.length > 0)  {
      const likedArts = arts.filter((art) =>
        likes.some((like) => like.art_id === art.id)
      );
      console.log("Filtered arts:", likedArts);
      setFilteredArts(likedArts);
    }
  }, [arts, likes]);

  useEffect(() => {
    console.log("Arts and likes before filtering:", arts, likes);
    filterArts();
  }, [arts, likes, filterArts]);



  return (
    <div className="py-3 sm:py-5 ">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {isLoading && <div>Loading...</div>}
        {filteredArts.map((art) => (
          <React.Fragment key={art.id}>
          <Art
            id={art.id}
            artist={art.user_id}
            title={art.title}
            image={art.art_pic_url}
            description={art.description}
            price={art.price}
          />
            <button
            onClick={() => handleDelete(art.id)}>remove this whatever
            </button>
            </React.Fragment>
          ))}
        </div>
      </div>
  );
};

export default AllMyLikes;
