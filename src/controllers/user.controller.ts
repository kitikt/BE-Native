import { Request, Response } from 'express';
import User from '~/models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      res.status(400).json({ message: 'Username or email already exists' });
      return;
    }

    // Create new user
        const user = new User({ username, email, password, role: 'user' });
        await user.save();

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token, user: { id: user._id, username, email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await (user as any).comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate JWT
const token = jwt.sign(
  { userId: user._id, username: user.username, role: user.role }, // Thêm role vào đây
  process.env.JWT_SECRET!,
  { expiresIn: '1h' }
);
    res.json({ token, user: { id: user._id, username: user.username, email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
};