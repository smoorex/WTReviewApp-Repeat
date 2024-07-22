const Review = require("../models/Review");

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("createdBy", "name");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addReview = async (req, res) => {
  const { title, author, rating, content } = req.body;

  try {
    const newReview = new Review({
      title,
      author,
      rating,
      content,
      createdBy: req.user.id,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
