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
    fullName: {
      type: String,
      index: true,
      trim: true,
      // required: [true, "Please add your Name"],
    },
    portfolio: {
      type: String,
      trim: true,
      // required: [true, "Please enter your Porfolio Link"],
      // unique: "Porfolio Link should be unique",
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
