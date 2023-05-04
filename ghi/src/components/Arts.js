import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Art from "./Art";

const Arts = () => {
  const [arts, setArts] = useState([]);
  const navigate = useNavigate();

  const handleImageClick = (artId) => {
    navigate(`/arts/${artId}/detail`);
  };

  useEffect(() => {
    fetchArts();
  }, []);

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
    <div className="py-3 sm:py-5 ">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {arts.map((art) => (
          <div key={art.id} style={{ cursor: "pointer" }}>
            <Art
              artist={art.username}
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
  );
};
export default Arts;
