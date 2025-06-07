import { Request, Response } from 'express';
import { cloudinary } from '~/config/cloudinary';
import Recipe from '~/models/Recipe';


export const createRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    let imageUrl = '';

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'recipes',
      });
      imageUrl = result.secure_url; 
    }

    let categoryData: { _id: string; name: string; description: string } | null = null;
    if (req.body.category) {
      try {
        categoryData = JSON.parse(req.body.category);
      } catch (e) {
        console.error('Lỗi phân tích category:', e);
        res.status(400).json({ message: 'Dữ liệu category không hợp lệ' });
        return;
      }
    }

    // Tạo đối tượng recipe
    const recipeData = {
      ...req.body,
      imageUrl,
      categories: categoryData ? [{
        _id: categoryData._id,
        name: categoryData.name,
        description: categoryData.description,
      }] : [], // Lưu thông tin category đầy đủ
    };

    // Xóa category khỏi req.body để tránh xung đột
    delete recipeData.category;
    delete recipeData.categoryIds; // Đề phòng trường hợp cũ

    const recipe = new Recipe(recipeData);
    const saved = await recipe.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tạo recipe', error: err });
  }
};
export const getAllRecipes = async (_req: Request, res: Response): Promise<void> => {
  try {
    const recipes = await Recipe.find(); 
    res.json(recipes);
  } catch (err) {
    console.error('Lỗi khi lấy danh sách recipe:', err);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách recipe', error: err });
  }
};

export const getRecipeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const recipe = await Recipe.findById(id); 
    if (!recipe) {
      res.status(404).json({ message: 'Không tìm thấy recipe' });
      return;
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy recipe', error: err });
  }
};

export const updateRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    let updatedData = { ...req.body };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'recipes',
      });
      updatedData.imageUrl = result.secure_url;
    }

    const updated = await Recipe.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updated) {
      res.status(404).json({ message: 'Recipe không tồn tại' });
      return;
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật recipe', error: err });
  }
};
export const deleteRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const deleted = await Recipe.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ message: 'Recipe không tồn tại' });
      return;
    }
    res.json({ message: 'Xóa thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa recipe', error: err });
  }
};
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipes = await Recipe.find();
    if (!recipes || recipes.length === 0) {
      res.status(404).json({ message: 'Không tìm thấy recipe nào' });
      return;
    }

    const allCategories = recipes
      .flatMap(recipe => recipe.categories)
      .filter((category, index, self) =>
        index === self.findIndex((c) => c.name === category.name)
      );

    res.json(allCategories);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách category', error: err });
  }
};
export const addCategoryToRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipeId = req.params.id;
    const { name, description } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Name category không được để trống' });
      return;
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      res.status(404).json({ message: 'Recipe không tồn tại' });
      return;
    }

    recipe.categories.push({ name, description });
    await recipe.save();

    res.status(201).json(recipe.categories);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm category', error });
  }
};


export const updateCategoryInRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipeId = req.params.id;
    const categoryId = req.params.categoryId;
    const { name, description } = req.body;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      res.status(404).json({ message: 'Recipe không tồn tại' });
      return;
    }

    const category = recipe.categories.id(categoryId);
    if (!category) {
      res.status(404).json({ message: 'Category không tồn tại' });
      return;
    }

    if (name !== undefined) category.name = name;
    if (description !== undefined) category.description = description;

    await recipe.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật category', error });
  }
};
export const deleteCategoryInRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipeId = req.params.id;
    const categoryId = req.params.categoryId;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      res.status(404).json({ message: 'Recipe không tồn tại' });
      return;
    }

    const category = recipe.categories.id(categoryId);
    if (!category) {
      res.status(404).json({ message: 'Category không tồn tại' });
      return;
    }

    recipe.categories.pull({ _id: categoryId }); 
    await recipe.save();

    res.json({ message: 'Xóa category thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa category', error });
  }
};