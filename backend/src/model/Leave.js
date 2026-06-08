const mongoose = require("mongoose")

const leaveSchema = new mongoose.Schema(
{
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  reason: String,
  fromDate: String,
  toDate: String,

  status: {
    type: String,
    default: "Pending"
  },

  adminSignature: String,  
  pdfFile: String
},
{ timestamps:true }
)

module.exports = mongoose.model("Leave", leaveSchema)
