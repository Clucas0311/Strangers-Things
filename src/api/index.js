export const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT";

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
    console.log("------------->data-------------->", data);
    return data;
  } catch (error) {
    console.error("There was an error registering user", error);
  }
};
