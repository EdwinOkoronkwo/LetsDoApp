import { API_URL } from "../../config";

/**
 * Fetch tasks from the backend.
 * @returns {Array} - A list of tasks.
 */
export const getTasks = async () => {
  try {
    const res = await fetch(`${API_URL}/api/tasks`);

    if (!res.ok) {
      throw new Error(`Error fetching tasks: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("data from getTasks: ", data);

    return data || []; // Return the tasks array or an empty array
  } catch (err) {
    console.error("Error fetching tasks:", err);
    return []; // Return an empty array in case of error
  }
};

/**
 * Post a new task to the backend.
 * @param {Object} taskData - The task data to be posted.
 * @returns {Object} - The newly created task data.
 */
export const postTask = async (taskData) => {
  try {
    const res = await fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!res.ok) {
      throw new Error(`Error posting task: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Task successfully added:", data);
    return data;
  } catch (err) {
    console.error("Error posting task:", err);
    throw err; // Rethrow the error
  }
};

/**
 * Delete a task by ID.
 * @param {string} taskId - The ID of the task to be deleted.
 * @returns {boolean} - Returns true if the task was successfully deleted.
 */
export const deleteTask = async (taskId) => {
  try {
    const res = await fetch(`${API_URL}/api/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`Error deleting task: ${res.statusText}`);
    }

    console.log(`Task with ID ${taskId} successfully deleted`);
    return true;
  } catch (err) {
    console.error("Error deleting task:", err);
    throw err; // Rethrow the error
  }
};

/**
 * Edit (update) a task by ID.
 * @param {Object} taskData - The task data to update, including the task ID.
 * @returns {Object} - The updated task data.
 */
export const editTask = async (taskData) => {
  if (!taskData || !taskData.id) {
    console.error("Missing taskId or values in editTask:", { taskData });
    throw new Error("Task ID and task data are required");
  }

  try {
    const { id, ...dataToSend } = taskData;
    const res = await fetch(`${API_URL}/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Backend Validation Error:", errorData);
      throw new Error(
        errorData.message || `Error updating task: ${res.statusText}`
      );
    }

    const data = await res.json();
    console.log(`Task with ID ${id} successfully updated:`, data);
    return data;
  } catch (err) {
    console.error("Error updating task:", err);
    throw err;
  }
};

/**
 * Search for tasks based on a search term.
 * @param {string} searchTerm - The search term to query tasks.
 * @returns {Array} - A list of tasks that match the search term.
 */
export const searchTasks = async (searchTerm) => {
  if (!searchTerm) {
    throw new Error("Search term is required");
  }

  try {
    const res = await fetch(
      `${API_URL}/api/tasks/search?query=${encodeURIComponent(searchTerm)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Backend Error:", errorData);
      throw new Error(
        errorData.message || `Error searching tasks: ${res.statusText}`
      );
    }

    const tasks = await res.json();
    console.log(`Successfully fetched ${tasks.length} tasks`);
    return tasks;
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw err;
  }
};
