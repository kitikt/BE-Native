import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // phải return để dừng middleware và đảm bảo không tiếp tục gọi next()
    res.status(401).json({ message: "No token provided" });
    return;  // <=== thêm return này
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; username: string; role: "user" | "admin" };
    // gán user vào req, cần khai báo type mở rộng cho req.user trong type.d.ts
    req.user = decoded;
    console.log("Authenticated user:", req.user);
    next(); // tiếp tục pipeline
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
    return; // <=== thêm return này
  }
};
