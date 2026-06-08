const mongoose = require("mongoose")

const menuVoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  mealType: String,
  oldItem: String,
  suggestedItem: String,
  date: Date
})

module.exports = mongoose.model("MenuVote", menuVoteSchema)
