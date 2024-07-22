const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  const email = req.params.email;
  console.log("EMAIL IN SERVER: ", email);
  try {
    const user = await User.findOne({ email: email });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const payload = { id: email };
    const jwtKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payload, jwtKey, { expiresIn: "1hr" });

    console.log("REGISTER RESPOMSE: ", {
      token: token,
      email: email,
    });

    res.status(200).json({ token: token, email: email });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = { id: user._id };
    const jwtKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payload, jwtKey, { expiresIn: "1hr" });

    res.status(200).json({ id: user._id, token: token, email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

const getUserProfile = async (req, res) => {
  // Implement logic to get user profile
};

const addFavourites = async (req, res) => {
  const { email, favorites } = req.body;

  if (!email || !favorites) {
    return res
      .status(400)
      .json({ message: "Email and favorites are required." });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Add new favorites to the user's favorites array
    user.favorites = [...user.favorites, ...favorites];

    // Save the updated user
    await user.save();

    return res
      .status(200)
      .json({ message: "Favorites added successfully.", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  addFavourites,
  getUser,
};
