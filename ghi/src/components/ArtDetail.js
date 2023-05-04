import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function ArtDetail() {
  const [art, setArt] = useState([]);
  const [userId, setUserId] = useState("");
  const { art_id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuthContext();

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

  useEffect(() => {
    fetchId();
  }, []);

  const fetchArt = useCallback(async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/arts/${art_id}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setArt(data);
    }
  }, [art_id]);

  useEffect(() => {
    fetchArt();
  }, [fetchArt]);

  const goToUpdateArtForm = () => {
    navigate(`/arts/${art_id}/update`);
  };

  const goToCreateLikeForm = () => {
    navigate("/likes", { state: { art } });
  };

  return art ? (
    <div className="min-h-screen w-full flex items-center justify-center bg-cream-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h5 className="text-center text-2xl font-bold text-gray-900">
          Artwork Details
        </h5>
        <div className="flex justify-center">
          <img
            alt="picture_here"
            src={art.art_pic_url}
            className="w-full max-w-md h-auto object-cover rounded mx-auto"
          ></img>
        </div>
        <div className="space-y-4">
          <p className="text-center text-xl font-semibold">
            Title: {art.title}
          </p>
          <p className="text-center text-xl font-semibold">
            Artist: {art.username}
          </p>
          <p className="text-center text-xl font-semibold">
            Description: {art.description}
          </p>
          <p className="text-center text-xl font-semibold">
            Price: {art.price}
          </p>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          {parseInt(userId) === parseInt(art.user_id) && (
            <button
              onClick={goToUpdateArtForm}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
            >
              Update Art
            </button>
          )}
          <button
            onClick={goToCreateLikeForm}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          >
            Like this art!
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default ArtDetail;
