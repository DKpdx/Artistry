import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function CreateLikeForm() {
  const location = useLocation();
  const { art } = location.state || {};
  const [userId, setUserId] = useState(art?.user_id || "");
  const [artId, setArtId] = useState(art?.id || "");
  const [likedBy, setLikedBy] = useState("");
  const navigate = useNavigate();
  const { token } = useAuthContext();

  const handleLikedByChange = (e) => {
    const value = e.target.value;
    setLikedBy(value);
  };

  const handleArtIdChange = (e) => {
    const value = e.target.value;
    setArtId(value);
  };

  const handleUserIdChange = (e) => {
    const value = e.target.value;
    setUserId(value);
  };

  const fetchAccount = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setLikedBy(data.account.id);
    } else {
      console.log("Error fetching account:", response.status);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchArt = useCallback(async () => {
    if (!artId) return;
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/arts/${artId}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      // setArt(data);
      setArtId(data.id);
      setUserId(data.user_id);
    }
  }, [art]);

  useEffect(() => {
    if (!art) return;
    setArtId(art.id);
    setUserId(art.user_id);
  }, [art]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.user_id = userId;
    data.art_id = artId;
    data.liked_by = likedBy;
    data.created_at = new Date().toISOString();
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/likes`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setUserId("");
      setArtId("");
      setLikedBy("");
      navigate("/likes/list");
    } else {
      console.log("Unable to Like Art");
    }
  };

  return (
    <div className="flex items-top justify-center bg-cream-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h1 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Like Some Art!
          </h1>
          <p className=" text-center text text-gray-900">
            (pssst just click the big orange button... I already filled out your
            form)
          </p>
        </div>
        <form
          id="create-like-form"
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="user_id" className="sr-only">
                User ID No.(artist):
              </label>
              <input
                placeholder="Artist's ID No.:"
                required
                type="text"
                name="user_id"
                id="user_id"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={handleUserIdChange}
                value={userId}
              />
            </div>

            <div>
              <label htmlFor="art_id" className="sr-only">
                Art ID No.:
              </label>
              <input
                placeholder="Art ID No.:"
                required
                type="text"
                name="art_id"
                id="art_id"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={handleArtIdChange}
                value={artId}
              />
            </div>

            <div>
              <label htmlFor="liked_by" className="sr-only">
                Liked By (your id)
              </label>
              <input
                placeholder="Liked by"
                required
                type="text"
                name="liked_by"
                id="liked_by"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={handleLikedByChange}
                value={likedBy}
              />
            </div>

            <div>
              <button
                type="submit"
                className="group mt-4 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Save this like, or whatevers
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreateLikeForm;
