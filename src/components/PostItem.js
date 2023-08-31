import React, { useState } from "react";
import { deletePost } from "../api";
import { EditPostForm } from "../components";
import { Link } from "react-router-dom";
import "./PostItem.css";

const PostItem = ({ post, setPosts, token, showLink }) => {
  const [showEdit, setShowEdit] = useState(false);
  console.log("post", post);
  // if (post.isAuthor) {
  //   post.messages = [
  //     {
  //       id: "5e8d1f2539e7a70017a7c968",
  //       user: {
  //         id: "5e8d1f2539e7a70017a7c962",
  //         username: "jane1234",
  //       },
  //       content: "I am very much in the market for a fine violin.",
  //     },
  //   ];
  // }
  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };
  const handleDeleteClick = async (postId) => {
    await deletePost(token, postId);
    setPosts((prevPost) => prevPost.filter((post) => post._id !== postId));
  };

  let content = <div className="center aligned header">{post.title}</div>;
  if (showEdit) {
    content = (
      <EditPostForm
        id={post._id}
        token={token}
        setPosts={setPosts}
        setShowEdit={setShowEdit}
        showEdit={showEdit}
      />
    );
  }
  return (
    <div className="ui card">
      <div className="content">
        {post.isAuthor ? (
          <i
            onClick={() => handleEditClick()}
            className="edit icon right floated aligned "
          >
            Mine
          </i>
        ) : null}
        <div className="meta">{post.author.username}</div>
        <div className="center aligned header">{content}</div>
        <div className="center aligned description">
          <p>{post.description}</p>
          <p>{post.price}</p>
        </div>
        <div className="extra-content">
          <div className="center aligned header">
            {!showLink ? (
              <Link to={"/posts"}>Go Back</Link>
            ) : (
              <Link to={`/posts/${post._id}`}>View Post </Link>
            )}
          </div>
        </div>
        {post.isAuthor ? (
          <button
            onClick={() => handleDeleteClick(post._id)}
            className="negative ui button right floated"
          >
            Delete
          </button>
        ) : null}
        <div
          role="list"
          className="ui divided relaxed list"
          style={{ color: "#444" }}
        >
          {/* {post.messages.map((message) => {
            return (
              <div role="listitem" className="item">
                <b>{message.fromUser}</b>
                <p className="content">{message.content}</p>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
