import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function CreateLikeForm() {
  const { token } = useAuthContext();
  const [, setArts] = useState([]);
  const [userId, setUserId] = useState("");
  const [artId, setArtId] = useState("");
  const [likedBy, setLikedBy] = useState("");
  const [, setAccount] = useState([]);
  const navigate = useNavigate();

  const handleUserIdChange = (e) => {
    const value = e.target.value;
    setUserId(value);
  };

  const handleArtIdChange = (e) => {
    const value = e.target.value;
    setArtId(value);
  };

  const handleLikedByChange = (e) => {
    const value = e.target.value;
    setLikedBy(value);
  };


  const fetchAccount = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setAccount(data.account);
      setLikedBy(data.account.id);
    } else {
      console.log("Error fetching account:", response.status);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchArts = async () => {
      const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/arts`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setArts(data.arts);
      }
    };

  useEffect(() => {
      fetchArts();
    }, []);

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
      navigate("");
    } else {
      console.log("Unable to Like Art");
    }
  };

  return (
    <div className="flex items-top justify-center bg-cream-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h1 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            LIKE ART
          </h1>
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
                Liked By
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
                className="group relative  mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
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
