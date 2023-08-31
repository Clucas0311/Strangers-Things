import React from "react";
import { useParams } from "react-router-dom";
import { PostItem } from "../components";

const PostDetails = ({ token, posts }) => {
  const { postId } = useParams();

  const singlePost = posts.find((post) => post._id === postId);

  if (!singlePost) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <PostItem post={singlePost} />
    </div>
  );
};

export default PostDetails;
