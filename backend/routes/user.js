const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  addFavourites,
  getUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.post("/login", loginUser);
router.post("/favourites", addFavourites);
router.get("/:email", getUser);

module.exports = router;
