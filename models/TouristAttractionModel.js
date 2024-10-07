import mongoose from "mongoose";

const TouristAtracttionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    type: {
      type: mongoose.Schema.ObjectId,
      ref: "Type",
      required: true,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("TouristAttraction", TouristAtracttionSchema);
