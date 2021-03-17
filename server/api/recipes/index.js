import express from 'express';
import * as controller from './recipes.controller';

let router = express.Router();

// GET methods
router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:recipeId/reviews/:reviewId', controller.showReview);

// POST method
router.post('/', controller.create);
router.post('/:recipeId/reviews', controller.createReview);

// PUT method
router.put('/:id', controller.update);
router.put('/:recipeId/reviews/:reviewId', controller.updateReview);

// DELETE method
router.delete('/:id', controller.destroy);
router.delete('/:recipeId/reviews/:reviewId', controller.destroyReview);

export {router};
