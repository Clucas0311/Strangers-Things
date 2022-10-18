import React from "react";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  console.log("post", post);
  return (
    <div className="ui card">
      <div className="content">
        <div className="center aligned header">{post.title}</div>
        <div className="center aligned description">
          <p>{post.description}</p>
        </div>
        <div className="extra-content">
          <div className="center aligned header">
            <Link to="">View Location</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
