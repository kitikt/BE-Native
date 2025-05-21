import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    name : {type:String, required : true },
    description :{type: String },
    ingredients : {type:[String], required : true },
    instructions :{type:  String , required : true}, 
    cookTime : {type:String , required :true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    createdAt : {type:Date, default :Date.now} 
})
export default mongoose.model('Recipe', RecipeSchema)