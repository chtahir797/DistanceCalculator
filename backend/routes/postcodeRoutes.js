const express = require('express');
const router = express.Router();
const postcodeController = require('../controllers/postcodeController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', postcodeController.getAllPostcodes);
router.get('/:id', postcodeController.getPostcodeById);
router.post('/', authMiddleware, postcodeController.createPostcode);
router.put('/:id', authMiddleware, postcodeController.updatePostcode);
router.delete('/:id', authMiddleware, postcodeController.deletePostcode);

module.exports = router;
