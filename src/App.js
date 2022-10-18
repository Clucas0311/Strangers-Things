import React, { useState, useEffect } from "react";
import { BASE_URL, fetchPosts } from "./api";
import { PostList, SignUp, Home } from "./components";
import { Routes, Route, Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const result = await fetchPosts();
        setPosts(result);
      } catch (error) {
        console.error("There was an error fetching posts", error);
      }
    };
    getPosts();
  }, []);

  console.log("THIS IS POSTS", posts);

  return (
    <div className="container">
      <nav className="ui secondary menu">
        <Link className="item" to="/">
          Home
        </Link>
        <Link className="item" to="/account/login">
          Log In
        </Link>
        <Link className="item" to="/account/signup">
          Sign up
        </Link>
      </nav>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/account/signup"
          element={<SignUp setToken={setToken} />}
        />
        <Route path="/posts" element={<PostList posts={posts} />} />
      </Routes>
    </div>
  );
};

export default App;
