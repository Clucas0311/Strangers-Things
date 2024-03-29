import React, { useState, useEffect } from "react";
import { fetchPosts, fetchGuest } from "./api";
import {
  PostList,
  AccountForm,
  Home,
  AddPostForm,
  PostDetails,
} from "./components";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );
  const [guest, setGuest] = useState(null);
  const navigate = useNavigate();

  console.log("guest---->", guest);

  useEffect(() => {
    const getPosts = async () => {
      const { error, posts } = await fetchPosts(token);
      if (error) {
        console.error(error);
      }
      setPosts(posts);
    };
    getPosts();
  }, [token]);

  const logOut = () => {
    setToken(null);
    setGuest(null);
    navigate("/");
  };

  useEffect(() => {
    console.log("HERE");
    if (token) {
      const getGuest = async () => {
        const { username } = await fetchGuest(token);
        console.log("username", username);
        setGuest(username);
      };
      getGuest();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
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
          {token ? (
            <button className="item" onClick={logOut}>
              Log Out
            </button>
          ) : (
            <>
              <Link className="item" to="/account/login">
                Log In
              </Link>
              <Link className="item" to="/account/register">
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route exact path="/" element={<Home guest={guest} />} />
        <Route
          path="/posts/create"
          element={<AddPostForm token={token} setPosts={setPosts} />}
        />
        <Route
          path="/posts"
          element={<PostList posts={posts} setPosts={setPosts} token={token} />}
        />
        <Route
          path="/posts/:postId"
          element={<PostDetails token={token} posts={posts} />}
        />
        <Route
          path="/account/:action"
          element={<AccountForm setToken={setToken} />}
        />
      </Routes>
    </div>
  );
};

export default App;
