import express from 'express';
import connectDB from '~/config/db';
import recipeRoutes from '~/routes/recipe.route';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Routes
app.use('/api/recipes', recipeRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('DB connect failed:', err);
});