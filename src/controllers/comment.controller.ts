// controllers/commentController.ts
import { Request, Response } from "express";
import Comment from "~/models/Comment";
import Recipe from "~/models/Recipe";
import mongoose from "mongoose";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { content, recipeId } = req.body;
    console.log("Body nhận được:", req.body);
    console.log("req.user:", req.user);

    // Kiểm tra dữ liệu đầu vào
    if (!content || !recipeId) {
      return res.status(400).json({ message: "Thiếu content hoặc recipeId" });
    }

    // Kiểm tra req.user từ middleware authenticate
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Không tìm thấy thông tin người dùng. Token không hợp lệ?" });
    }

    // Kiểm tra userId có phải ObjectId hợp lệ không
    const userId = req.user.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID người dùng không hợp lệ" });
    }

    // Kiểm tra công thức
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Công thức không tồn tại" });
    }

    // Tạo bình luận
    const comment = new Comment({
      content,
      recipe: recipeId,
      user: userId,
      createdAt: new Date(),
    });
    await comment.save();
    console.log("Bình luận đã tạo:", comment);

    res.status(201).json(comment);
  } catch (error: any) {
    console.error("Lỗi khi tạo comment:", error.message);
    res.status(400).json({ message: "Lỗi khi tạo bình luận: " + error.message });
  }
};

export const getCommentsByRecipe = async (req: Request, res: Response) => {
  try {
    const { recipeId } = req.params;
    const comments = await Comment.find({ recipe: recipeId })
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error: any) {
    console.error("Lỗi khi lấy comment:", error.message);
    res.status(500).json({ message: "Lỗi lấy comment", error: error.message });
  }
};