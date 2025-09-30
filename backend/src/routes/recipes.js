const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { protect } = require('../middleware/auth');

// 公开路由
router.get('/', recipeController.getRecipes);
router.get('/:id', recipeController.getRecipeById);
router.get('/:id/comments', recipeController.getRecipeComments);

// 受保护的路由
router.post('/', protect, recipeController.createRecipe);
router.put('/:id', protect, recipeController.updateRecipe);
router.delete('/:id', protect, recipeController.deleteRecipe);
router.post('/:id/comments', protect, recipeController.addRecipeComment);
router.post('/:id/like', protect, recipeController.likeRecipe);
router.post('/:id/collect', protect, recipeController.collectRecipe);
router.post('/:id/rate', protect, recipeController.rateRecipe);
router.post('/:id/cover', protect, recipeController.uploadRecipeCover);
router.post('/:id/step-image', protect, recipeController.uploadStepImage);
router.post('/avatar', protect, recipeController.uploadUserAvatar);

module.exports = router;