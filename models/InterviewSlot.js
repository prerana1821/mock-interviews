import mongoose, { Schema } from "mongoose";

const InterviewSlotSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "UserDetail" },
  gotAPartner: {
    type: Boolean,
    default: false,
  },
  slot: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.InterviewSlot ||
  mongoose.model("InterviewSlot", InterviewSlotSchema);
