import React, { useState } from "react";
import { fetchCreatePost } from "../api";

const AddPostForm = ({ token, setPosts }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };
  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };
  const willDeliverChangeHandler = () => setWillDeliver(!willDeliver);

  const onAddFormSubmitHandler = async (event) => {
    event.preventDefault();
    const result = await fetchCreatePost(
      token,
      title,
      description,
      price,
      willDeliver
    );
    console.log("RESULT", result);
    setPosts((prevPost) => [result, ...prevPost]);
    setTitle("");
    setDescription("");
    setPrice(0);
    setWillDeliver(false);
  };

  return (
    <form className="ui form" onSubmit={onAddFormSubmitHandler}>
      <h1>Add A New Post</h1>
      <div className="field">
        <label>Title</label>
        <input
          type="text"
          value={title}
          placeholder="Title"
          required
          onChange={titleChangeHandler}
        />
      </div>
      <div className="field">
        <label>Description</label>
        <input
          type="text"
          value={description}
          placeholder="Description"
          required
          onChange={descriptionChangeHandler}
        />
      </div>
      <div className="field">
        <label>Price</label>
        <input
          type="text"
          value={price}
          placeholder="Description"
          required
          onChange={priceChangeHandler}
        />
      </div>
      <div className="field">
        <div className="ui checkbox">
          <input
            type="checkbox"
            tabIndex="0"
            value={willDeliver}
            placeholder="Description"
            onChange={willDeliverChangeHandler}
          />
          <label>Willing To Deliver?</label>
        </div>
      </div>
      <button className="ui button" type="submit">
        CREATE
      </button>
    </form>
  );
};

export default AddPostForm;
