// src/routes/recipe.route.ts
import express from 'express';
import upload from '~/middlewares/upload'; 
import {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  addCategoryToRecipe,
  updateCategoryInRecipe,
  deleteCategoryInRecipe,
  getAllCategories,
} from '~/controllers/recipe.controller';

const router = express.Router();
router.post('/', upload.single('image'), createRecipe); 
router.post('/', createRecipe);
router.get('/', getAllRecipes);
router.get('/categories', getAllCategories);
router.get('/:id', getRecipeById);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);
//categories
router.post('/:id/categories', addCategoryToRecipe);
router.put('/:id/categories/:categoryId', updateCategoryInRecipe);
router.delete('/:id/categories/:categoryId', deleteCategoryInRecipe);

export default router;
