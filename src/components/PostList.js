import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => {
        return <PostItem id={post._id} post={post} />;
      })}
    </div>
  );
};

export default PostList;
