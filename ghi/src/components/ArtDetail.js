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
        <div>
          <h5 className="text-center text-2xl font-bold text-gray-900">
            Artwork Details
          </h5>
        </div>
        <div className="rounded-md shadow-sm -space-y-px mb-3">
          <table className="table table-striped w-full">
            <thead>
              <tr>
                <th className="bg-gray-100 py-2 px-4 rounded-t-md font-semibold">
                  Artist
                </th>
                <th className="bg-gray-100 py-2 px-4 rounded-t-md font-semibold">
                  Title
                </th>
                <th className="bg-gray-100 py-2 px-4 rounded-t-md font-semibold">
                  Picture
                </th>
                <th className="bg-gray-100 py-2 px-4 rounded-t-md font-semibold">
                  Description
                </th>
                <th className="bg-gray-100 py-2 px-4 rounded-t-md font-semibold">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              <tr key={art.id} value={art.id}>
                <td className="py-2 px-4">{art.username}</td>
                <td className="py-2 px-4">{art.title}</td>
                <td className="py-2 px-4">
                  <img
                    alt="picture_here"
                    src={art.art_pic_url}
                    className="w-48 h-32 object-cover rounded"
                  ></img>
                </td>
                <td className="py-2 px-4">{art.description}</td>
                <td className="py-2 px-4">{art.price}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-center mt-4">
          {parseInt(userId) === parseInt(art.user_id) && (
            <button
              onClick={goToUpdateArtForm}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
            >
              Update Art
            </button>
          )}
        </div>
        <button
          onClick={goToCreateLikeForm}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
        >
          Like this art!
        </button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default ArtDetail;
