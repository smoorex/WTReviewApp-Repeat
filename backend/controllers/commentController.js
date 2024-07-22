const Comment = require("../models/Comment"); // Adjust the path as necessary
const User = require("../models/User"); // If you have a User model

// Controller function to post a comment
const postComment = async (req, res) => {
  try {
    const { content, email } = req.body;
    const itemId = req.params.itemId;

    if (!content || !itemId) {
      return res
        .status(400)
        .json({ error: "Content, email, and itemId are required" });
    }

    // Create a new comment
    const newComment = new Comment({
      id: itemId,
      content,
      author: email,
    });

    // Save the comment to the database
    await newComment.save();

    // Respond with the created comment, including the author's name
    res.status(201).json({
      _id: newComment._id,
      content: newComment.content,
      author: newComment.author,
      createdAt: newComment.createdAt,
    });
  } catch (error) {
    console.error("Error posting comment:", error);
    res
      .status(500)
      .json({ error: "An error occurred while posting the comment" });
  }
};

const getComments = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const itemReviews = await Comment.find({ id: itemId });

    // Map the comments to include the author's name
    const formattedComments = itemReviews.map((comment) => ({
      id: comment._id,
      content: comment.content,
      author: comment.author,
      createdAt: comment.createdAt,
    }));

    res.status(200).json(formattedComments);
  } catch (error) {
    res.status(500).json({ error: "Error in Server" });
  }
};

module.exports = { postComment, getComments };
