import React, { useEffect, useState } from "react";
import Art from "./Art";
import ArtsContext from "./ArtsContext";

const Arts = () => {
  const [arts, setArts] = useState([]);

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
    <ArtsContext.Provider value={arts}>
      <div className="py-3 sm:py-5 ">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {arts.map((art) => (
            <Art
              key={art.id}
              artist={art.user_id}
              title={art.title}
              image={art.art_pic_url}
              description={art.description}
              price={art.price}
            />
          ))}
        </div>
      </div>
    </ArtsContext.Provider>
  );
};

export {Arts}
export default Arts
