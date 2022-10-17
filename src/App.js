import React, { useState, useEffect } from "react";
import { BASE_URL } from "./api";
import { PostList, SignUp } from "./components";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts`);
        const { data } = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("There was an error fetching posts", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <PostList posts={posts} />
      <SignUp />
    </div>
  );
};

export default App;
