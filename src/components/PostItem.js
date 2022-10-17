import React from "react";
import Card from "./shared/Card";

const PostItem = ({ post }) => {
  console.log("post", post);
  return (
    <Card>
      <h1>{post.title}</h1>
      <h4 className="description">Description: {post.description}</h4>
      <div className="location">{post.location}</div>
    </Card>
  );
};

export default PostItem;
