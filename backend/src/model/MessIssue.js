const mongoose = require("mongoose");

const messIssueSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    issueType: {
      type: String,
      required: true
    },
    mealType: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "In Progress", "Resolved"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MessIssue", messIssueSchema);
