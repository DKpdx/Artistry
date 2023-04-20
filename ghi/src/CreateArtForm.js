import React, { useState } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';

function CreateArtForm() {
    const { token } = useAuthContext();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [artPicture, setArtPicture] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [userId, setUserId] = useState('');

    const handleTitleChange = (event) => {
        const value = event.target.value;
        setTitle(value);
    }

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        setCategory(value);
    }

    const handleArtPictureChange = (event) => {
        const value = event.target.value;
        setArtPicture(value);
    }

    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
    }

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.title = title;
        data.category = category;
        data.art_pic_url = artPicture;
        data.description = description;
        data.price = price;
        data.user_id = userId;

        const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/arts`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setTitle('');
            setCategory('');
            setArtPicture('');
            setDescription('');
            setPrice('');
            setUserId('');
        }
    }

    return (
        <div className="row">
            <div className="shadow p-4 mt-4">
                <h1>Create Art</h1>
                <form id="create-art-form" onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input placeholder="Title" required type="text" name="title" id="title" className="form-control" onChange={handleTitleChange} value={title}/>
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input placeholder="Category" required type="text" name="category" id="category" className="form-control"
                        onChange={handleCategoryChange} value={category}/>
                        <label htmlFor="category">Category</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input placeholder="Art Picture" required type="text" name="art_picture" id="art_picture" className="form-control" onChange={handleArtPictureChange} value={artPicture}/>
                        <label htmlFor="art_picture">Art Picture</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input placeholder="Description" required type="text" name="description" id="description" className="form-control" onChange={handleDescriptionChange} value={description}/>
                        <label htmlFor="description">Description</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input placeholder="Price" required type="text" name="price" id="price" className="form-control" onChange={handlePriceChange} value={price}/>
                        <label htmlFor="price">Price</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    )

}
export default CreateArtForm;
