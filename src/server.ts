import express from 'express';
import connectDB from '~/config/db';
import recipeRoutes from '~/routes/recipe.route';
import userRoutes from '~/routes/user.route';
import aiRoutes from "~/routes/ai.route";

import commentRoutes from '~/routes/comment.route';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '~/config/swagger';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT as string, 10) || 8080;

app.use(express.json());
app.use(cors()); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use("/api/ai", aiRoutes);

// Middleware xử lý lỗi
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Lỗi server nội bộ' });
});

connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => { // Sử dụng '0.0.0.0' để lắng nghe tất cả giao diện mạng
    console.log(`Server chạy tại http://192.168.1.2:${PORT}`);
  });
}).catch(err => {
  console.error('DB connect failed:', err);
});