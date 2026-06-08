const express = require("express");
const router = express.Router();
const { 
  createComplaint, 
  myComplaints, 
  deleteComplaint, 
  allComplaints, 
  updateStatus
} = require("../Controllers/complaintController");
const { protect, admin } = require("../middlewares/authMiddleware");

// ================= STUDENT ROUTES =================
const upload = require("../middlewares/upload"); // make sure path correct ho

router.post("/create", protect, upload.single("image"), createComplaint);
router.get("/my", protect, myComplaints);
router.delete("/:id", protect, deleteComplaint);

// ================= ADMIN ROUTE ================
router.get("/admin/complaints", protect, admin, allComplaints);
router.put(
  "/status/:id",
  protect,
  admin,
  updateStatus
)


module.exports = router;
