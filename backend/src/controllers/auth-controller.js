const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { expressjwt: expressJwt } = require("express-jwt"); // Updated import
const { errorHandler } = require("../utils/helpers/dbErrorHandler");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("photo_url");

exports.signup = (req, res) => {
  console.log("req.body from signup: ", req.body);
  // Use multer to handle the file upload
  upload(req, res, async (err) => {
    if (err) {
      // Handle any multer errors (e.g., file size issues)
      return res.status(400).json({ error: "File upload failed" });
    }

    const { name, email, password, phone_number, date_of_birth, address } =
      req.body; // Include new fields
    const photo = req.file ? `/uploads/${req.file.filename}` : null; // Set the photo URL (path to uploaded file)

    if (
      !name ||
      !email ||
      !password ||
      !phone_number ||
      !date_of_birth ||
      !address
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already taken" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(password, salt);

      // Create the user with the uploaded photo URL
      const user = new User({
        name,
        email,
        hashed_password,
        photo, // Store the path to the uploaded photo
        phone_number,
        date_of_birth,
        address,
      });

      // Save the user
      await user.save();

      // Remove sensitive data
      user.salt = undefined;
      user.hashed_password = undefined;

      // Send the response with the user data
      res.json({ user });
    } catch (err) {
      console.error("Error during signup:", err);
      return res.status(400).json({ error: errorHandler(err) });
    }
  });
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }

    // If user is found make sure email and password match
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password don't match",
      });
    }

    // Log user object to confirm the photo field is included
    console.log("User object:", user);

    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, "super_secret_secret");

    // persist the token as "t" in cookie with expiry date
    res.cookie("authtoken", token, { expire: new Date() + 9999 });

    // return response with user and token to front end client
    const { _id, name, email: userEmail, photo } = user;
    return res.json({
      token,
      user: { _id, email: userEmail, name, photo },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("authtoken");
  res.json({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
  secret: "super_secret_secret",
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  const user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resource! Access denied",
    });
  }
  next();
};
