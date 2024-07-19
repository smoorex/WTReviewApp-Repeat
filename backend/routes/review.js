const express = require('express');
const router = express.Router();
const { getReviews, addReview, updateReview, deleteReview } = require('../controllers/reviewController');

router.get('/', getReviews);
router.post('/', addReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;
