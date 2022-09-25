const express = require('express')
const router = express.Router()
const {requireAuth, checkUser} = require('../middleware/authMiddleware')
const reviewController = require('../controllers/reviewController')

router.get('/reviews', requireAuth, reviewController.get_review)
router.get('/reviews/create', requireAuth,  reviewController.get_create)
router.post('/reviews', requireAuth, reviewController.create_post)
router.get('/reviews/:id', requireAuth,  reviewController.get_review_detail)
router.delete('/reviews/:id', requireAuth,  reviewController.delete_review)
module.exports = router;