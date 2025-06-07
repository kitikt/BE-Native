import express from 'express';
import { register, login } from '~/controllers/user.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication and management
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: kiet
 *               email:
 *                 type: string
 *                 format: email
 *                 example: trangiakit1010@gmail.com
 *               password:
 *                 type: string
 *                 example: yourpassword123
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 68426955d5776fa1b99ee367
 *                     username:
 *                       type: string
 *                       example: kiet
 *                     email:
 *                       type: string
 *                       example: trangiakit1010@gmail.com
 *                     role:
 *                       type: string
 *                       enum: [user, admin]
 *                       example: user
 *       400:
 *         description: Username or email already exists
 *       500:
 *         description: Server error
 */
router.post('/register', register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: trangiakit1010@gmail.com
 *               password:
 *                 type: string
 *                 example: yourpassword123
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 68426955d5776fa1b99ee367
 *                     username:
 *                       type: string
 *                       example: kiet
 *                     email:
 *                       type: string
 *                       example: trangiakit1010@gmail.com
 *                     role:
 *                       type: string
 *                       enum: [user, admin]
 *                       example: user
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/login', login);

export default router;
