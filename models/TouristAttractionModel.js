import mongoose from "mongoose";
import { TOURIST_ATTRACTION_STATUS } from "../utils/constants.js";

const TouristAtracttionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
    },
    coordinates: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
    phoneNumber: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(TOURIST_ATTRACTION_STATUS),
      default: TOURIST_ATTRACTION_STATUS.OPEN,
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
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TouristAttraction", TouristAtracttionSchema);
