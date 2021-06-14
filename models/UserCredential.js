import mongoose from "mongoose";

const UserCredentialSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      index: true,
      trim: true,
      required: [true, "Please add your Username"],
      unique: "Username should be unique",
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please enter your Email ID"],
      unique: "Email ID should be unique",
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please Enter your password"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.UserCredential ||
  mongoose.model("UserCredential", UserCredentialSchema);
