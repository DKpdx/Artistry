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
    };
    fetchArtData();
  }, [token]);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Update Art</h1>
          <form id="update-art-form" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                onChange={handleTitleChange}
                placeholder="Title"
                required
                type="text"
                name="title"
                id="title"
                className="form-control"
                value={title}
              />
              <label htmlFor="title">Title</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleCategoryChange}
                placeholder="Category"
                required
                type="text"
                name="category"
                id="category"
                className="form-control"
                value={category}
              />
              <label htmlFor="category">Category</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleArtPictureChange}
                placeholder="Art Picture"
                required
                type="text"
                name="art_picture"
                id="art_picture"
                className="form-control"
                value={artPicture}
              />
              <label htmlFor="art_picture">Art Picture</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleDescriptionChange}
                placeholder="Description"
                required
                type="text"
                name="description"
                id="description"
                className="form-control"
                value={description}
              />
              <label htmlFor="description">Description</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePriceChange}
                placeholder="Price"
                required
                type="text"
                name="price"
                id="price"
                className="form-control"
                value={price}
              />
              <label htmlFor="price">Price</label>
            </div>
            <button className="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UpdateArtForm;
