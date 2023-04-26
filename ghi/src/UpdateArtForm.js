import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useParams } from "react-router-dom";

function UpdateArtForm() {
  const { art_id } = useParams();
  const { token } = useAuthContext();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [artPicture, setArtPicture] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(value);
  };

  const handleArtPictureChange = (event) => {
    const value = event.target.value;
    setArtPicture(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};

    data.title = title;
    data.category = category;
    data.art_pic_url = artPicture;
    data.description = description;
    data.price = price;

    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/arts/${art_id}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setTitle("");
      setCategory("");
      setArtPicture("");
      setDescription("");
      setPrice("");
    }
  };

  useEffect(() => {
    const fetchArtData = async () => {
      const URL = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/arts`;

      const response = await fetch(URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    };
    fetchArtData();
  }, [token]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-cream-50 py-12 px-0 sm:px-0 lg:px-0">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Update Art
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="title" className="sr-only">
                  Title
                </label>
                <input
                  onChange={handleTitleChange}
                  placeholder="Title"
                  required
                  type="text"
                  name="title"
                  id="title"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={title}
                />
              </div>
              <div>
                <label htmlFor="category" className="sr-only">
                  Category
                </label>
                <input
                  onChange={handleCategoryChange}
                  placeholder="Category"
                  required
                  type="text"
                  name="category"
                  id="category"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={category}
                />
              </div>
              <div>
                <label htmlFor="art_picture" className="sr-only">
                  Art Picture
                </label>
                <input
                  onChange={handleArtPictureChange}
                  placeholder="Art Picture"
                  required
                  type="text"
                  name="art_picture"
                  id="art_picture"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={artPicture}
                />
              </div>
              <div>
                <label htmlFor="description" className="sr-only">
                  Description
                </label>
                <input
                  onChange={handleDescriptionChange}
                  placeholder="Description"
                  required
                  type="text"
                  name="description"
                  id="description"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={description}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Update Art
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default UpdateArtForm;
