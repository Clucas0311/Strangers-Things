import React, { useState, useEffect } from "react";
import { fetchPosts } from "./api";
import { PostList, AccountForm, Home } from "./components";
import { Routes, Route, Link } from "react-router-dom";

import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || ""
  );

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

  useEffect(() => {
    window.localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="container">
      <nav className="ui secondary menu">
        <Link className="item" to="/">
          Home
        </Link>
        <Link className="item" to="/posts">
          Posts
        </Link>
        <div className="right menu">
          <Link className="item" to="/account/login">
            Log In
          </Link>
          <Link className="item" to="/account/register">
            Sign up
          </Link>
        </div>
      </nav>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/account/:action"
          element={<AccountForm setToken={setToken} />}
        />
        <Route path="/posts" element={<PostList posts={posts} />} />
      </Routes>
    </div>
  );
};

export default App;
