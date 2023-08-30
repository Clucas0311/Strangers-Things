import React, { useState } from "react";
import { updatePost } from "../api";
import { useNavigate } from "react-router-dom";

const EditPostForm = ({ id, token, setPosts, setShowEdit, showEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const titleChangeHandler = (event) => setTitle(event.target.value);
  const descriptionChangeHandler = (event) =>
    setDescription(event.target.value);
  const priceChangeHandler = (event) => setPrice(event.target.value);
  const willDeliverChangeHandler = () => setWillDeliver(!willDeliver);

  const onEditFormSubmitHandler = async (event) => {
    event.preventDefault();
    const updatedPost = await updatePost(
      id,
      token,
      title,
      description,
      price,
      willDeliver
    );
    console.log("updatedPost", updatedPost);
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post._id === id) {
          return { ...post, ...updatedPost };
        }
        return post;
      });
    });
    setTitle("");
    setDescription("");
    setPrice(0);
    setWillDeliver(false);
    setShowEdit(!showEdit);
  };

  return (
    <form className="ui form" onSubmit={onEditFormSubmitHandler}>
      <h2>Edit A New Post</h2>
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
          placeholder="A description of the post"
          autoComplete="off"
          required
          onChange={descriptionChangeHandler}
        />
      </div>
      <div className="field">
        <label>Price</label>
        <input
          type="text"
          value={price}
          placeholder="Price"
          required
          autoComplete="off"
          onChange={priceChangeHandler}
        />
      </div>
      <div className="field">
        <div className="ui checkbox">
          <input
            type="checkbox"
            tabIndex="0"
            value={willDeliver}
            onChange={willDeliverChangeHandler}
          />
          <label>Willing To Deliver?</label>
        </div>
      </div>
      {errorMessage ? (
        <p className="ui negative message">{errorMessage}</p>
      ) : null}
      <button className="ui button" type="submit">
        Edit Post
      </button>
    </form>
  );
};

export default EditPostForm;
