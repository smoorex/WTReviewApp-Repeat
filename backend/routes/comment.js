const express = require("express");
const router = express.Router();
const {
  postComment,
  getComments,
} = require("../controllers/commentController"); // Adjust the path as necessary

// Route to post a comment
router.post("/:itemId", postComment);
router.get("/:itemId", getComments);

module.exports = router;
