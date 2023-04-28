import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Art from "./Art";
import ArtsContext from "./ArtsContext";

const Arts = () => {
  const [arts, setArts] = useState([]);
  const navigate = useNavigate();

  const handleClick = (artId) => {
    navigate(`/arts/${artId}/detail`);
  };

  useEffect(() => {
    fetchArts();
  }, []);

  useEffect(() => {
    console.log("Arts updated in Arts Component:", arts);
  }, [arts]);

  const fetchArts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_USER_SERVICE_API_HOST}/arts`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch arts data");
      }
      const data = await response.json();
      setArts(data);
    } catch (error) {
      console.error("Error fetching arts data: ", error);
    }
  };

  return (
<<<<<<< HEAD
    <ArtsContext.Provider value={arts}>
      <div className="py-3 sm:py-5 ">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {arts.map((art) => (
            <Art
              key={art.id}
              artist={art.user_id}
=======
    <div className="py-3 sm:py-5 ">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {arts.map((art) => (
          <div
            key={art.id}
            onClick={() => handleClick(art.id)}
            style={{ cursor: "pointer" }}
          >
            <Art
              artist={art.username}
              artistId={art.user_id}
              artId={art.id}
              title={art.title}
              image={art.art_pic_url}
              description={art.description}
              price={art.price}
            />
<<<<<<< HEAD
          ))}
        </div>
=======
          </div>
        ))}
>>>>>>> main
      </div>
    </ArtsContext.Provider>
  );
};

export {Arts}
export default Arts
