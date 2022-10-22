import React, { useState } from "react";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [willDeliver, setWillDeliver] = useState(false);
  return (
    <form className="ui form">
      <h1>Add A New Post</h1>
      <div className="field">
        <label>Title</label>
        <input type="text" value={title} placeholder="Title" required />
      </div>
      <div className="field">
        <label>Description</label>
        <input
          type="text"
          value={description}
          placeholder="Description"
          required
        />
      </div>
      <div className="field">
        <label>Price</label>
        <input type="text" value={price} placeholder="Description" required />
      </div>
      <div className="field">
        <div className="ui checkbox">
          <input
            type="checkbox"
            tabIndex="0"
            class="hidden"
            value={willDeliver}
            placeholder="Description"
            required
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
