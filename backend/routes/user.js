const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  addFavourites,
  getUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.post("/login", loginUser);
router.post("/favourites", addFavourites);
router.get("/profile", getUserProfile);
router.get("/:email", getUser);

module.exports = router;
