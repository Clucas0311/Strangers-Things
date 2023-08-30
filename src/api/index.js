export const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT";

export const makeHeaders = (token) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const callAPI = async (endPointPath, defaultOptions = {}) => {
  const { token, method, body } = defaultOptions;
  const options = {
    headers: makeHeaders(token),
  };

  if (method) {
    options.method = method;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endPointPath}`, options);
  const result = await response.json();

  return result;
};

export const fetchPosts = async (token) => {
  // const response = await fetch(`${BASE_URL}/posts`);
  // console.log("---THIS IS THE RESPONSE OBJECT----", response);
  // const { data } = await response.json();
  // console.log("THIS IS DATA", data.posts);
  // return data.posts;
  try {
    const { success, error, data } = await callAPI("/posts", {
      token: token,
    });
    if (success) {
      return {
        error: null,
        posts: data.posts,
      };
    } else {
      return {
        error: error.message,
        posts: [],
      };
    }
  } catch (error) {
    console.error("There was an error fetching posts", error);
    return {
      error: "Failed to load Posts",
      posts: [],
    };
  }
};

export const registerUser = async (username, password) => {
  // try {
  //   const response = await fetch(`${BASE_URL}/users/register`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       user: {
  //         username,
  //         password,
  //       },
  //     }),
  //   });
  //   const data = await response.json();
  //   console.log("-------------data-------------->", data);
  //   return data;
  // } catch (error) {
  //   console.error("There was an error registering user", error);
  // }

  try {
    const { success, error, data } = await callAPI("/users/register", {
      method: "POST",
      body: {
        user: {
          username,
          password,
        },
      },
    });
    if (success) {
      return {
        error: null,
        token: data.token,
        message: data.message,
      };
    } else {
      return {
        error: error.message,
        token: null,
        message: null,
      };
    }
  } catch (error) {
    console.error("There was  an error registering the user", error);

    return {
      error: "Registration Failed",
      token: null,
      message: null,
    };
  }
};
export const loginUser = async (username, password) => {
  try {
    const { success, error, data } = await callAPI("/users/login", {
      method: "POST",
      body: {
        user: {
          username,
          password,
        },
      },
    });
    if (success) {
      return {
        error: null,
        token: data.token,
        message: data.message,
      };
    } else {
      return {
        error: error.message,
        token: null,
        message: null,
      };
    }
  } catch (error) {
    console.error("There was  an error logging in the user", error);

    return {
      error: "Log in failed",
      token: null,
      message: null,
    };
  }
};

export const fetchGuest = async (token) => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/users/me`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log("--------------GETTING USER RESPONSE BODY ---->", response);
  //     const { data } = await response.json();
  //     console.log("USER DATA---------------->", data);
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  try {
    const { success, data, error } = await callAPI("/users/me", {
      token: token,
    });
    console.log("success", data);

    if (success) {
      return {
        error: null,
        username: data.username,
      };
    } else {
      return {
        error: error.message,
        username: null,
      };
    }
  } catch (error) {
    console.error("Failed to fetch guest", error);
    return {
      error: "Failed to load Guest Information",
      username: null,
    };
  }
};

export const fetchCreatePost = async (
  token,
  title,
  description,
  price,
  willDeliver
) => {
  // try {
  //   const response = await fetch(`${BASE_URL}/posts`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //       post: {
  //         title,
  //         description,
  //         price,
  //         willDeliver,
  //       },
  //     }),
  //   });
  //   console.log("THIS IS THE ADD POST RESPONSE --->", response);
  //   const { data } = await response.json();
  //   console.log("THIS IS THE ADD POST DATA --> ", data);
  //   return data;
  // } catch (error) {
  //   console.error("There was an error adding post", error);
  // }
  try {
    const post = {
      title,
      description,
      price,
      willDeliver,
    };
    const { success, error, data } = await callAPI("/posts", {
      token: token,
      method: "POST",
      body: {
        post: post,
      },
    });
    if (success) {
      return {
        error: null,
        post: data.post,
      };
    } else {
      return {
        error: error.message,
        post: null,
      };
    }
  } catch (error) {
    console.error("POST /posts failed: ", error);

    return {
      error: "Failed to create Post",
      post: null,
    };
  }
};

export const deletePost = async (token, postId) => {
  try {
    await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
  }

  try {
    const { success, error } = await callAPI(`/posts/${postId}`, {
      method: "DELETE",
      token: token,
    });
    if (success) {
      return {
        error: null,
        data: null,
      };
    } else {
      return {
        error: error.message,
        data: null,
      };
    }
  } catch (error) {
    console.error("DELETE /posts/postId failed", error);
    return {
      error: "Failed to delete Post",
      data: null,
    };
  }
};

export const updatePost = async (
  id,
  token,
  title,
  description,
  price,
  location,
  willDeliver
) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    const {
      data: { post },
    } = result;
    return post;
  } catch (error) {
    console.error(error, "There was an error editing post.");
  }
};
