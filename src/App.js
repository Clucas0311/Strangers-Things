import React, { useState, useEffect } from "react";
import { fetchPosts, fetchGuest } from "./api";
import { PostList, AccountForm, Home } from "./components";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || ""
  );
  const [guest, setGuest] = useState(null);
  const navigate = useNavigate();
  console.log("guest---->", guest);

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

  const logOut = () => {
    setToken("");
    setGuest(null);
    navigate("/");
  };

  useEffect(() => {
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
          path="/account/:action"
          element={<AccountForm setToken={setToken} />}
        />
        <Route
          path="/posts"
          element={<PostList posts={posts} setPosts={setPosts} token={token} />}
        />
      </Routes>
    </div>
  );
};

export default App;
