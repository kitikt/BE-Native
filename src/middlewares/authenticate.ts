import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Chưa cung cấp token" });
    return;
  }

  const token = authHeader.split(" ")[1];
  console.log("Token nhận được:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; username: string; role: "user" | "admin" };
    console.log("Token giải mã:", decoded);
    
    // Ánh xạ userId thành id để đồng bộ với type và controller
    req.user = {
      id: decoded.userId,
      username: decoded.username,
      role: decoded.role
    };
    console.log("Authenticated user:", req.user);
    next();
  } catch (err: any) {
    console.error("Lỗi xác thực token:", err.message);
    res.status(401).json({ message: "Token không hợp lệ: " + err.message });
    return;
  }
};