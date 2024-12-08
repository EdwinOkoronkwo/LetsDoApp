const express = require("express");
const { check } = require("express-validator");
const multer = require("multer");
const path = require("path");
const {
  createUser,
  getUser,
  displayUsers,
  findUserById,
  updateUser,
} = require("../controllers/users-controllers");
const { requireSignin, isAuth } = require("../controllers/auth-controller");

const router = express.Router();

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with additional configurations (e.g., file type validation, size limit)
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size 5MB
});

router.post(
  "/users/signup",
  [
    check("name").notEmpty(),
    check("email").notEmpty(),
    check("hashed_password").notEmpty(),
  ],
  createUser
);

router.get("/", displayUsers);

router.get("/secret/:userId", requireSignin, isAuth, (req, res) => {
  res.json({ user: req.profile });
});
router.get("/:userId", getUser);

router.patch(
  "/profile/:userId",
  upload.single("photo_file"), // Handle single photo file upload
  updateUser
);

router.param("userId", findUserById);

module.exports = router;
