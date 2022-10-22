import React from "react";
import PostItem from "./PostItem";
import AddPostForm from "./AddPostForm";

const PostList = ({ posts, token, setPosts }) => {
  return (
    <div>
      <div>
        <AddPostForm token={token} setPosts={setPosts} />
      </div>
      {posts.map((post) => {
        return <PostItem key={post._id} post={post} />;
      })}
    </div>
  );
};

export default PostList;
