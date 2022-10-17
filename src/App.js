import React, { useState, useEffect } from "react";
import { BASE_URL } from "./api";
import { PostList, SignUp } from "./components";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");

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
      <SignUp setToken={setToken} />
      <PostList posts={posts} />
    </div>
  );
};

export default App;
