import { Schema, model, Document } from "mongoose";

export interface IComment extends Document {
  content: string;
  user: Schema.Types.ObjectId;
  recipe: Schema.Types.ObjectId;
  createdAt: Date;
}

const commentSchema = new Schema<IComment>({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  recipe: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IComment>("Comment", commentSchema);
