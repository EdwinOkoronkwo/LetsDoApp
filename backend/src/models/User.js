const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
    required: "Email is required",
  },
  completed: { type: Number },
  photo: { type: String }, // URL to the photo
  photo_file: { type: String }, // Path to the uploaded photo file
  date_of_birth: { type: Date }, // New field: Date of Birth
  address: { type: String }, // New field: Address
  phone_number: { type: String }, // New field: Phone Number
  created: {
    type: Date,
    default: Date.now,
  },
  hashed_password: {
    type: String,
    required: "Password is required",
  },
  salt: String,
});

// Virtual field for password
userSchema
  .virtual("password")
  .set(async function (password) {
    this._password = password;
    this.salt = await bcrypt.genSalt(10);
    this.hashed_password = await bcrypt.hash(password, this.salt);
  })
  .get(function () {
    return this._password;
  });

// Middleware to handle validation and remove virtual fields from output
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  if (!this.hashed_password) return next(new Error("Password is required"));
  next();
});

userSchema.methods = {
  authenticate: function (plainTextPassword) {
    return bcrypt.compare(plainTextPassword, this.hashed_password);
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      this.hashed_password = hashedPassword;
    } catch (err) {
      console.error("Error encrypting password:", err);
      return "";
    }
  },
};

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
