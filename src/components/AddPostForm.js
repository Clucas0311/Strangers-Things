import React, { useState } from "react";
import { fetchCreatePost } from "../api";
import { useNavigate } from "react-router-dom";

const AddPostForm = ({ token, setPosts }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

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
    const { error, post } = await fetchCreatePost(
      token,
      title,
      description,
      price,
      willDeliver
    );
    if (post) {
      setPosts((prevPost) => [post, ...prevPost]);
      setTitle("");
      setDescription("");
      setPrice(0);
      setWillDeliver(false);
      navigate("/posts");
    }
    setErrorMessage(error);
  };

  return (
    <form className="ui form" onSubmit={onAddFormSubmitHandler}>
      <h2>Create A New Post</h2>
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
        CREATE
      </button>
    </form>
  );
};

export default AddPostForm;
