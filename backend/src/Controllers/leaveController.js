const PDFDocument = require("pdfkit")
const fs = require("fs")
const path = require("path")
const Leave = require("../model/Leave")

// Student Apply
exports.applyLeave = async(req,res)=>{
  const leave = await Leave.create({
    student:req.user.id,
    reason:req.body.reason,
    fromDate:req.body.fromDate,
    toDate:req.body.toDate
  })

  res.json(leave)
}

// Admin View All
exports.getAllLeaves = async(req,res)=>{
  const leaves = await Leave.find().populate("student","name email")
  res.json(leaves)
}

// Admin Approve
exports.approveLeave = async(req,res)=>{
  const leave = await Leave.findById(req.params.id)

  leave.status="Approved"
  leave.adminSignature="SIGNED_BY_ADMIN"

  // Generate PDF
  const doc = new PDFDocument()
  const fileName = `leave_${leave._id}.pdf`
  const filePath = path.join("uploads",fileName)

  doc.pipe(fs.createWriteStream(filePath))

  doc.fontSize(18).text("HOSTEL LEAVE PASS")
  doc.moveDown()

  doc.fontSize(12).text(`Student: ${leave.student}`)
  doc.text(`Reason: ${leave.reason}`)
  doc.text(`From: ${leave.fromDate}`)
  doc.text(`To: ${leave.toDate}`)
  doc.moveDown()
  doc.text("Digitally Approved By Admin")
  doc.text("Signature: ✔")

  doc.end()

  leave.pdfFile=fileName
  await leave.save()

  res.json({message:"Approved"})
}

// Student My Leaves
exports.myLeaves = async(req,res)=>{
  const leaves = await Leave.find({student:req.user.id})
  res.json(leaves)
}
