import mongoose from "mongoose";

const UserCredentialSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      index: true,
      trim: true,
      unique: "Username should be unique",
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please enter your Email ID"],
      unique: "Email ID should be unique",
    },
    fullName: {
      type: String,
      index: true,
      trim: true,
    },
    portfolio: {
      type: String,
      trim: true,
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

export default mongoose.models.UserCredential ||
  mongoose.model("UserCredential", UserCredentialSchema);
