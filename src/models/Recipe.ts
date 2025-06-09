import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String
});

const RecipeSchema = new mongoose.Schema({
  name : { type: String, required : true },
  description : { type: String },
  ingredients : { type: [String], required : true },
  instructions : { type: String, required : true }, 
  cookTime : { type: String, required : true },
  calories : { type: Number, required : true },
  imageUrl : { type: String },
  categories : [CategorySchema],
  comments : [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  createdAt : { type: Date, default : Date.now },
  difficulty : { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
});

export default mongoose.model('Recipe', RecipeSchema);
