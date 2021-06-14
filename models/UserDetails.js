import mongoose, { Schema } from "mongoose";

const UserDetailSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, ref: "UserCredential" },
    name: {
      type: String,
      index: true,
      trim: true,
      required: [true, "Please add your Name"],
    },
    portfolio: {
      type: String,
      trim: true,
      required: [true, "Please enter your Porfolio Link"],
      unique: "Porfolio Link should be unique",
    },
    interviewDone: {
      type: Number,
      trim: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.UserDetail ||
  mongoose.model("UserDetail", UserDetailSchema);
