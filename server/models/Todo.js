import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    text: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
