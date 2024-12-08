const { validationResult } = require("express-validator");
const Task = require("../models/Task");
const formidable = require("formidable");
const { errorHandler } = require("../utils/helpers/dbErrorHandler");
const Category = require("../models/category");
const dayjs = require("dayjs");

// Display all tasks
const displayTasks = async (req, res, next) => {
  let tasks;

  try {
    tasks = await Task.find({});
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unable to retrieve tasks, please try again later." });
  }

  res.status(200).json({
    tasks: tasks.map((task) => task.toObject({ getters: true })),
  });
};

// Create a new task
const createTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Invalid input, please check the data provided." });
  }

  const { title, category, priority } = req.body;

  const newTask = new Task({
    title,
    category,
    priority,
  });

  try {
    await newTask.save();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unable to create a new task, please try again." });
  }

  res.status(201).json({ task: newTask });
};

// Edit a task

const editTask = async (req, res, next) => {
  console.log("Req.body from editTask: ", req.body);
  //Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation Errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    title,
    description,
    category,
    priority,
    date,
    picture,
    status,
    user,
  } = req.body;
  const taskID = req.params.taskID;

  let task;
  try {
    task = await Task.findById(taskID);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
  } catch (err) {
    console.error("Error finding task:", err);
    return res
      .status(500)
      .json({ message: "A problem occurred. Task could not be edited." });
  }

  // Handle category conversion
  if (category && typeof category === "string") {
    try {
      const categoryObj = await Category.findOne({ name: category });
      if (!categoryObj) {
        return res.status(422).json({ message: "Invalid category provided." });
      }
      task.category = categoryObj._id;
    } catch (err) {
      console.error("Error finding category:", err);
      return res.status(500).json({ message: "Error processing category." });
    }
  } else {
    task.category = category;
  }

  // Validate priority field
  const validPriorities = ["High", "Medium", "Low"];
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({
      message: "Invalid priority. Valid values are: High, Medium, Low.",
    });
  }
  task.priority = priority;

  // Validate date format
  if (date && !dayjs(date).isValid()) {
    return res.status(422).json({ message: "Invalid date format." });
  }

  // Update task fields
  task.title = title;
  task.description = description;
  task.date = date ? dayjs(date).toDate() : task.date;
  task.picture = picture || task.picture;
  task.status = status || task.status;
  task.priority = priority || "Medium";

  if (user) {
    task.user = user; // Update user if provided
  }

  try {
    await task.save();
  } catch (err) {
    console.error("Error saving task:", err);
    return res
      .status(500)
      .json({ message: "A problem occurred. Task could not be edited." });
  }

  res.status(200).json({
    message: "Task updated successfully!",
    task: task.toObject({ getters: true }),
  });
};

// Delete a task
const deleteTask = async (req, res, next) => {
  const taskID = req.params.taskID;
  let task;

  try {
    task = await Task.findById(taskID);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "A problem occurred. Task cannot be deleted." });
  }

  if (!task) {
    return res.status(404).json({ message: "This task could not be found." });
  }

  try {
    await Task.findByIdAndDelete(taskID);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "A problem occurred. Task cannot be deleted." });
  }

  res.status(200).json({ message: "Task deleted successfully." });
};

// Display tasks by category
const displayTasksByCategory = async (req, res, next) => {
  const { category } = req.params;
  let tasks;

  try {
    tasks = await Task.find({ category });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unable to retrieve tasks, please try again later." });
  }

  res.status(200).json({
    tasks: tasks.map((task) => task.toObject({ getters: true })),
  });
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().exec();
    const count = await Task.countDocuments().exec();

    res.json({
      meta: {
        totalCount: count,
      },
      tasks,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Find task by ID middleware
exports.findTaskById = async (req, res, next, id) => {
  try {
    const task = await Task.findById(id).exec();
    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }
    req.task = task;
    next();
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Get a single task
exports.getTask = (req, res) => {
  return res.json(req.task);
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const task = req.task;
  try {
    const result = await Task.deleteOne({ _id: task._id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const { ObjectId } = require("mongoose").Types;

exports.createOrUpdateTask = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log request body for debugging
    const {
      taskId,
      title,
      description,
      category,
      priority,
      status,
      user,
      picture,
    } = req.body;

    // Check required fields
    if (!title || !description || !category || !user) {
      return res.status(400).json({
        error: "Missing required fields: title, description, category, or user",
      });
    }

    // Validate ObjectId format for category and user
    if (!ObjectId.isValid(category)) {
      console.error("Invalid category ID:", category);
      return res.status(400).json({ error: "Invalid category ID" });
    }
    if (!ObjectId.isValid(user)) {
      console.error("Invalid user ID:", user);
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Check if category exists
    console.log("Validating category:", category);
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      console.error("Category not found:", category);
      return res.status(400).json({ error: "Category not found" });
    }

    // Validate priority
    const validPriorities = ["High", "Medium", "Low"];
    if (priority && !validPriorities.includes(priority)) {
      console.error("Invalid priority value:", priority);
      return res.status(400).json({
        error: "Invalid priority value. Valid options are: High, Medium, Low",
      });
    }

    // Validate status
    const validStatus = ["Not started", "Started", "Completed"];
    if (status && !validStatus.includes(status)) {
      console.error("Invalid status value:", status);
      return res.status(400).json({
        error:
          "Invalid status value. Valid options are: Not started, Started, Completed",
      });
    }

    // Validate picture URL if provided
    if (picture && !isValidUrl(picture)) {
      console.error("Invalid picture URL:", picture);
      return res.status(400).json({ error: "Invalid picture URL" });
    }

    // Prepare task data
    const taskData = {
      title,
      description,
      category,
      priority: priority || "Medium",
      status: status || "Not started",
      user,
      picture: picture || null,
    };

    console.log("Task data to save:", taskData);

    let task;
    if (taskId) {
      // If taskId is provided, it's an update
      console.log("Updating existing task with taskId:", taskId);
      task = await Task.findByIdAndUpdate(taskId, taskData, { new: true })
        .populate("user", "name email")
        .populate("category", "name");

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
    } else {
      // If no taskId is provided, it's a new task
      console.log("Creating new task");
      task = new Task(taskData);
      await task.save();

      // Populate after saving
      task = await Task.findById(task._id)
        .populate("user", "name email")
        .populate("category", "name");
    }

    console.log("Task saved successfully:", task);
    res.status(200).json({ task });
  } catch (error) {
    console.error("Error saving task:", error.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

// Get all task categories
exports.getTaskCategories = async (req, res) => {
  try {
    const categoryIds = await Task.distinct("category").exec();
    const categories = await Category.find({
      _id: { $in: categoryIds },
    }).exec();

    res.json({
      meta: {
        countCategories: categories.length,
      },
      categories,
    });
  } catch (err) {
    console.error("Error retrieving categories:", err);
    return res.status(400).json({ error: "Error retrieving categories" });
  }
};

// Get filtered tasks based on various criteria
exports.getFilteredTasks = async (req, res) => {
  const order = req.body.order || "desc";
  const sortBy = req.body.sortBy || "date";
  const limit = Number(req.body.limit) || 100;
  const skip = Number(req.body.skip) || 0;
  const findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  try {
    const tasks = await Task.find(findArgs)
      .populate("category")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec();

    res.json({
      size: tasks.length,
      tasks,
    });
  } catch (err) {
    console.error("Error retrieving tasks:", err);
    return res.status(400).json({ error: "Tasks not found" });
  }
};

// Search tasks by title
exports.getSearchedTasks = async (req, res) => {
  const { query } = req.query; // Get the search term from the query parameters
  console.log("query from getSearchedTasks: ", query);

  if (!query || query.trim() === "") {
    // If no search term, return all tasks (same as getAllTasks)
    return getAllTasks(req, res);
  }

  try {
    // Convert the query to lowercase and ensure it matches any part of the task name
    const lowercaseQuery = query.toLowerCase();

    // Perform a partial search for tasks whose titles contain the query term (case-insensitive)
    const tasks = await Task.find({
      title: { $regex: lowercaseQuery, $options: "i" }, // Case-insensitive matching
    })
      .populate("user", "name email") // Populate user fields
      .populate("category", "name"); // Populate category fields

    console.log(`Found ${tasks.length} tasks matching "${lowercaseQuery}"`);

    if (tasks.length === 0) {
      return res
        .status(404)
        .json({ message: "No tasks found for the search term" });
    }

    // Return the tasks with populated user and category fields
    res.json(tasks);
  } catch (err) {
    console.error("Error searching tasks:", err);
    res.status(500).json({ message: "Error processing search" });
  }
};

// Fetch task by ID and populate user and category
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id)
      .populate("user", "name email") // Populate user with name and email
      .populate("category", "name"); // Populate category with name

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    console.log("Fetching all tasks...");

    // Fetch all tasks with populated user and category fields
    const tasks = await Task.find()
      .populate("user", "name email") // Populate user fields
      .populate("category", "name"); // Populate category fields

    // Log the fetched tasks
    console.log("Fetched Tasks with Populate:", JSON.stringify(tasks, null, 2));

    if (!tasks || tasks.length === 0) {
      console.log("No tasks found");
      return res.status(404).json({ error: "No tasks found" });
    }

    // Send the populated tasks
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// Export the controller functions
exports.displayTasks = displayTasks;
exports.createTask = createTask;
exports.editTask = editTask;
exports.deleteTask = deleteTask;
exports.displayTasksByCategory = displayTasksByCategory;
