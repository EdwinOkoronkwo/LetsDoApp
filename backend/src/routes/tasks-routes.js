const express = require("express");
const { check, validationResult } = require("express-validator"); // Add validationResult
const tasksControllers = require("../controllers/tasks-controllers");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const formidable = require("formidable");
const Task = require("../models/Task");
const { errorHandler } = require("../utils/helpers/dbErrorHandler");
const Category = require("../models/category");

// In tasksRouter.js
router.get("/search", tasksControllers.getSearchedTasks);

router.post("/", tasksControllers.createOrUpdateTask);
router.patch(
  "/:taskID",
  [
    check("title").notEmpty(),
    check("category").notEmpty(),
    check("priority").isIn(["High", "Medium", "Low"]),
  ],
  //tasksControllers.editTask
  tasksControllers.createOrUpdateTask
);

router.delete("/:taskID", tasksControllers.deleteTask);

//router.get("/", tasksControllers.displayTasks);
router.get("/", tasksControllers.getAllTasks);

router.get("/category/:category", tasksControllers.displayTasksByCategory);

module.exports = router;
