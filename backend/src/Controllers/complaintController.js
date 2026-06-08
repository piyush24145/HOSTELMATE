const Complaint = require("../model/Complaint")

// ================= CREATE =================
exports.createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create({
      user: req.user.id,
      type: req.body.type,
      room: req.body.room,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
       status: "Created",
  timeline: [{ status: "Created" }]
    })

    res.status(201).json(complaint)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Create failed" })
  }
}

// ================= MY COMPLAINTS =================
exports.myComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id })
      .sort({ createdAt: -1 })

    res.json(complaints)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Fetch failed" })
  }
}

// ================= DELETE =================
exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" })
    }

    // only owner can delete
    if (complaint.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" })
    }

    await complaint.deleteOne()
    res.json({ message: "Deleted" })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Delete failed" })
  }
}

// ================= ADMIN: ALL COMPLAINTS =================
exports.allComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
  .populate("user", "name email room")
  .sort({ createdAt: -1 })

    res.json(complaints)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Fetch failed" })
  }
}

exports.updateStatus = async (req, res) => {
  const { status } = req.body

  const complaint = await Complaint.findById(req.params.id)

  complaint.status = status
  complaint.timeline.push({ status })

  await complaint.save()

  res.json({ message: "Status Updated" })
}
