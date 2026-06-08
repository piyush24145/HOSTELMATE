const mongoose = require("mongoose")

// Timeline Schema
const timelineSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
})

// Complaint Schema
const complaintSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    type: {
      type: String,
      required: true
    },

    room: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    image: {
      type: String
    },

    status: {
      type: String,
      default: "Created"
    },

    timeline: {
      type: [timelineSchema],
      default: []
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Complaint", complaintSchema)
