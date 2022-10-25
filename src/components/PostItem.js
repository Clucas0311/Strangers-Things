import React from "react";
import { deletePost } from "../api";
import { Link } from "react-router-dom";

const PostItem = ({ post, setPosts, token }) => {
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
  const handleDeleteClick = async (postId) => {
    await deletePost(token, postId);
    setPosts((prevPost) => prevPost.filter((post) => post._id !== postId));
  };
  return (
    <div className="ui card">
      <div className="content">
        {post.isAuthor ? (
          <div className="right floated aligend tiny header">Mine</div>
        ) : null}
        <div className="center aligned header">{post.title}</div>
        <div className="center aligned description">
          <p>{post.description}</p>
          <p>{post.price}</p>
        </div>
        <div className="extra-content">
          <div className="center aligned header">
            <Link to="">View Location</Link>
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
