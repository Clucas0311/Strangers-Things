import React from "react";
import PostItem from "./PostItem";
import { Link } from "react-router-dom";

const PostList = ({ posts }) => {
  return (
    <div>
      <div>
        <Link to="/posts/create" className="ui button">
          Create Post
        </Link>
      </div>
      {posts.map((post) => {
        return <PostItem key={post._id} post={post} />;
      })}
    </div>
  );
};

export default PostList;
