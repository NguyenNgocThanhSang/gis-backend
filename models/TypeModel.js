import mongoose from "mongoose";

const TypeSchema = new mongoose.Schema(
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

export default mongoose.model("Type", TypeSchema);
