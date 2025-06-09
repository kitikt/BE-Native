import express from 'express';
import upload from '~/middlewares/upload';
import { authenticate } from '~/middlewares/authenticate';
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
import { isAdmin } from '~/middlewares/isAdmin';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipe management
 */

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get all recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: List of all recipes
 */
router.get('/', getAllRecipes);

/**
 * @swagger
 * /api/recipes/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: List of all categories
 */
router.get('/categories', getAllCategories);

/**
 * @swagger
 * /api/recipes:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: string
 *               cookTime:
 *                 type: string
 *               calories:
 *                 type: number
 *               difficulty:
 *                 type: string
 *                 enum: [Easy, Medium, Hard]
 *               category:
 *                 type: string
 *                 description: JSON stringified category object {_id, name, description}
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Recipe created
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - token missing or invalid
 */
router.post('/', authenticate, isAdmin, upload.single('image'), createRecipe);

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: Get recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe detail
 *       404:
 *         description: Recipe not found
 */
router.get('/:id', getRecipeById);

/**
 * @swagger
 * /api/recipes/{id}:
 *   put:
 *     summary: Update a recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: string
 *               cookTime:
 *                 type: string
 *               calories:
 *                 type: number
 *               difficulty:
 *                 type: string
 *                 enum: [Easy, Medium, Hard]
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Recipe updated
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       404:
 *         description: Recipe not found
 */
router.put('/:id', authenticate, isAdmin, upload.single('image'), updateRecipe);

/**
 * @swagger
 * /api/recipes/{id}:
 *   delete:
 *     summary: Delete a recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       404:
 *         description: Recipe not found
 */
router.delete('/:id', authenticate, isAdmin, deleteRecipe);

/**
 * @swagger
 * /api/recipes/{id}/categories:
 *   post:
 *     summary: Add category to a recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category added to recipe
 *       400:
 *         description: Missing category name
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       404:
 *         description: Recipe not found
 */
router.post('/:id/categories', authenticate, isAdmin, addCategoryToRecipe);

/**
 * @swagger
 * /api/recipes/{id}/categories/{categoryId}:
 *   put:
 *     summary: Update a category in a recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       404:
 *         description: Recipe or Category not found
 */
router.put('/:id/categories/:categoryId', authenticate, isAdmin, updateCategoryInRecipe);

/**
 * @swagger
 * /api/recipes/{id}/categories/{categoryId}:
 *   delete:
 *     summary: Delete a category from a recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       404:
 *         description: Recipe or Category not found
 */
router.delete('/:id/categories/:categoryId', authenticate, isAdmin, deleteCategoryInRecipe);

export default router;
