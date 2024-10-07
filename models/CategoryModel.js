import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);
