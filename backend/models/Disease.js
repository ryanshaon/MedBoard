import mongoose from "mongoose";

const diseaseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    country: {
      type: String
    },
    cases: {
      type: Number
    },
    deaths: {
      type: Number
    },
    recovered: {
      type: Number
    },
    source: {
      type: String
    }
  },
  { timestamps: true }
);

const Disease = mongoose.model("Disease", diseaseSchema);

export default Disease;