import { API_URL } from "../../config";

/**
 * Utility function to get the authentication token from localStorage.
 * @returns {string} The authentication token.
 */
const getAuthToken = () => {
  return localStorage.getItem("jwt");
};

/**
 * Fetches all users from the API.
 * @returns {Array} The list of users or an empty array if there is an error.
 */
export const getUsers = async () => {
  try {
    const res = await fetch(`${API_URL}/api/users`);

    if (!res.ok) {
      throw new Error(`Error fetching users: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Data from getUsers:", data);
    return data || [];
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
};

/**
 * Creates a new user via the API.
 * @param {Object} userData The user data to be created.
 * @returns {Object} The created user data.
 */
export const createUser = async (userData) => {
  try {
    const token = getAuthToken();

    const res = await fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error(`Error creating user: ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
};

/**
 * Updates an existing user via the API.
 * @param {Object} param0 The user ID and updated user data.
 * @param {string} param0.id The ID of the user to be updated.
 * @param {Object} param0.userData The updated user data.
 * @returns {Object} The updated user data.
 */
export const updateUser = async ({ id, userData }) => {
  try {
    const token = getAuthToken();

    const res = await fetch(`${API_URL}/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error(`Error updating user: ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error updating user:", err);
    throw err;
  }
};

/**
 * Deletes a user via the API.
 * @param {string} id The ID of the user to be deleted.
 * @returns {Object} The response data after deleting the user.
 */
export const deleteUser = async (id) => {
  try {
    const token = getAuthToken();

    const res = await fetch(`${API_URL}/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error deleting user: ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error deleting user:", err);
    throw err;
  }
};

/**
 * Updates a user's profile via the API.
 * @param {Object} param0 The user ID and updated user profile data.
 * @param {string} param0.id The ID of the user to update.
 * @param {FormData} param0.userData The FormData containing the updated profile information.
 * @returns {Object} The updated user profile.
 */
export const updateUserProfile = async ({ id, userData }) => {
  console.log("userId from services/updateUserProfile:", id);

  try {
    const token = getAuthToken();

    if (!token) {
      throw new Error("Authentication token is missing. Please log in.");
    }

    const res = await fetch(`${API_URL}/api/users/profile/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: userData,
    });

    const resBody = await res.json();
    console.log(resBody);

    if (!res.ok) {
      throw new Error(
        resBody?.message || `Error updating user profile: ${res.statusText}`
      );
    }

    return resBody;
  } catch (err) {
    console.error("Error updating user profile:", err.message);
    console.error(err);
    throw err;
  }
};

/**
 * Fetches a single user by their ID from the API.
 * @param {string} id The ID of the user to be fetched.
 * @returns {Object} The user data or an empty object if there is an error.
 */
export const getUser = async (id) => {
  try {
    const res = await fetch(`${API_URL}/api/users/${id}`);

    if (!res.ok) {
      throw new Error(`Error fetching user: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Data from getUser:", data);
    return data || {};
  } catch (err) {
    console.error("Error fetching user:", err);
    return {};
  }
};
