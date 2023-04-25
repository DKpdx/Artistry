import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ArtDetail() {
  const [art, setArt] = useState([]);
  const { art_id } = useParams();

  const fetchArt = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/arts/${art_id}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setArt(data);
    }
  };

  useEffect(() => {
    fetchArt();
  }, [art]);

  return art ? (
    <div className="py-3 sm:py-5">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Artist</th>
              <th>Title</th>
              <th>Picture</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr key={art.id} value={art.id}>
              <td>{art.username}</td>
              <td>{art.title}</td>
              <td>
                <img
                  alt="picture_here"
                  src={art.art_pic_url}
                  width="200"
                  height="150"
                ></img>
              </td>
              <td>{art.description}</td>
              <td>{art.price}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default ArtDetail;
