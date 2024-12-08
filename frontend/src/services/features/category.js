// const { API_URL } = require("../config");

export const createCategory = async (userId, token, category) => {
  try {
    const res = await fetch(`http://localhost:8000/api/categories`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getCategories = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/categories");
    const data = await res.json();
    // Extract the categories array from the response
    return data.categories || [];
  } catch (err) {
    console.error("Error fetching categories:", err);
    return []; // Return an empty array in case of error
  }
};
