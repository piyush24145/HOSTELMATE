const mongoose = require("mongoose")

const menuSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true
  },
  breakfast: [String],
  lunch: [String],
  dinner: [String]
})

module.exports = mongoose.model("Menu", menuSchema)
