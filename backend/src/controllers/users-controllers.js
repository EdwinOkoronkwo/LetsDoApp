const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../models/User");

const createUser = async (req, res, next) => {
  const { name, email, password, completed, picture, created } = req.body;

  // Hash the password
  let hashed_password;
  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    hashed_password = await bcrypt.hash(password, salt); // Hash the password with the salt
  } catch (err) {
    return next(new Error("Error hashing password"));
  }

  // Create the new user with the hashed password
  const newUser = new User({
    name,
    email,
    completed,
    picture,
    created,
    hashed_password, // Save the hashed password
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new Error("Failed to create user. Please try again."));
  }

  res.status(201).json({ user: newUser });
};

// Controller to display all users
const displayUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, "-hashed_password");
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Unable to retrieve users, please try again later." });
  }

  res.status(200).json({
    users: users.map((user) => user.toObject({ getters: true })),
  });
};

// Controller to find user by ID
const findUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    req.profile = user;
    next();
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to update user profile
const updateUser = async (req, res) => {
  try {
    const { name, email, address, date_of_birth, phone_number } = req.body; // Destructure the new fields
    let updatedFields = { name, email, address, date_of_birth, phone_number }; // Include the new fields in updatedFields

    // Handle the uploaded photo file
    if (req.file) {
      const photoFilePath = `/uploads/${req.file.filename}`;
      updatedFields.photo_file = photoFilePath;
      updatedFields.photo = photoFilePath;
    }

    console.log("Updated fields:", updatedFields); // Debugging the updated fields

    // Update the user in the database
    const user = await User.findByIdAndUpdate(
      req.profile._id,
      { $set: updatedFields },
      { new: true } // Return the updated user object
    ).exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove sensitive fields like password before returning the user data
    user.hashed_password = undefined;
    user.salt = undefined;

    console.log("Updated user:", user); // Log the updated user
    res.json(user); // Return the updated user data
  } catch (err) {
    console.error("Error updating user:", err);
    res
      .status(400)
      .json({ error: "You are not authorized to perform this action" });
  }
};

// In users-controllers.js
const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("userId in getUser", userId);

    // Fetch the user from the database (replace this with your actual data fetching logic)
    const user = await User.findById(userId); // If using MongoDB with Mongoose, or adjust for your ORM

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user }); // Send the user data as a response
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Combined Export
module.exports = {
  getUser,
  createUser,
  displayUsers,
  findUserById,
  updateUser,
};
