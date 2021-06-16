import mongoose, { Schema } from "mongoose";
import UserCredential from "../models/UserCredential";

const SlotSchema = new Schema({
  partner: {
    type: Schema.Types.ObjectId,
    ref: UserCredential,
    required: "User Id is required",
  },
  slot: {
    type: Date,
    required: true,
  },
});

const InterviewSlotSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "UserCredential" },
  slots: [SlotSchema],
});

export default mongoose.models.InterviewSlot ||
  mongoose.model("InterviewSlot", InterviewSlotSchema);
