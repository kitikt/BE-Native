import express from 'express';
import connectDB from '~/config/db';
import recipeRoutes from '~/routes/recipe.route';
import userRoutes from '~/routes/user.route';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '~/config/swagger'; 


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('DB connect failed:', err);
});