import React from "react";
import Card from "./shared/Card";

const PostItem = ({ post }) => {
  console.log("post", post);
  return (
    <Card>
      <div className="title">Title: {post.title}</div>
      <div className="description">Description: {post.description}</div>
      <div className="seller">{post.seller}</div>
      <div className="location">{post.location}</div>
    </Card>
  );
};

export default PostItem;
