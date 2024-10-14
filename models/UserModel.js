import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  location: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  locationBookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TouristAttraction",
    },
  ],
});

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
