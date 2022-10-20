export const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT";

export const fetchPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);
  console.log("---THIS IS THE RESPONSE OBJECT----", response);
  const { data } = await response.json();
  console.log("THIS IS DATA", data.posts);
  return data.posts;
};

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const data = await response.json();
    console.log("-------------data-------------->", data);
    return data;
  } catch (error) {
    console.error("There was an error registering user", error);
  }
};

export const fetchGuest = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("--------------GETTING USER RESPONSE BODY ---->", response);
    const { data } = await response.json();
    console.log("USER DATA---------------->", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
