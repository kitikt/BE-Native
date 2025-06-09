import { Router } from "express";
import { createComment, getCommentsByRecipe } from "~/controllers/comment.controller";
import { authenticate } from "~/middlewares/authenticate";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API for managing comments on recipes
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipeId
 *               - content
 *             properties:
 *               recipeId:
 *                 type: string
 *                 example: 665f28cc10b2fe769b2fd083
 *               content:
 *                 type: string
 *                 example: "This recipe is fire 🔥!"
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Server error
 */
router.post("/", authenticate, async (req, res) => {
  await createComment(req, res);
});

/**
 * @swagger
 * /api/comments/{recipeId}:
 *   get:
 *     summary: Get all comments for a recipe
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the recipe
 *     responses:
 *       200:
 *         description: List of comments with user info
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   content:
 *                     type: string
 *                   user:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       username:
 *                         type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Server error
 */
router.get("/:recipeId", async (req, res) => {
  await getCommentsByRecipe(req, res);
});

export default router;
