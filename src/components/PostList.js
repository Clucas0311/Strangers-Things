import React from "react";
import PostItem from "./PostItem";
import { Link } from "react-router-dom";

import "./PostList.css";

const PostList = ({ posts, setPosts, token }) => {
  return (
    <>
      <Link to="/posts/create" className="ui button">
        Create Post
      </Link>
      <div className="posts-container">
        {posts.map((post) => {
          return (
            <PostItem
              key={post._id}
              post={post}
              setPosts={setPosts}
              token={token}
              showLink
            />
          );
        })}
      </div>
    </>
  );
};

export default PostList;
