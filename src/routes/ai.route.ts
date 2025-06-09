import { Router } from "express";
import { suggestRecipe } from "~/controllers/ai.controller";
import { authenticate } from "~/middlewares/authenticate";
const router = Router();
/**
 * @swagger
 * /api/ai/suggest:
 *   post:
 *     summary: Gợi ý món ăn dựa trên đầu vào người dùng
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Tôi có gà và khoai tây, nấu món gì ngon?"
 *     responses:
 *       200:
 *         description: Trả về gợi ý món ăn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reply:
 *                   type: string
 *       401:
 *         description: Không có quyền truy cập (chưa đăng nhập)
 *       500:
 *         description: Lỗi server
 */

router.post("/suggest", authenticate, (req, res, next) => {
  suggestRecipe(req, res).catch(next);
});

export default router;
