const router = require("express").Router()
const { 
  createMenu, 
  getTodayMenu, 
  createFeedback, 
  getAllFeedback,
  createMessIssue,
  getMyMessIssues,
  getAllMessIssues,
  updateMessIssueStatus
} = require("../Controllers/messController")
const { protect, admin } = require("../middlewares/authMiddleware")

router.post("/admin/create", protect, admin, createMenu)
router.get("/today", protect, getTodayMenu)
router.post("/create", protect, createFeedback)
router.get("/admin", protect, admin, getAllFeedback)

// Mess Issue Routes
router.post("/issue/create", protect, createMessIssue)
router.get("/my", protect, getMyMessIssues)
router.get("/", protect, admin, getAllMessIssues)
router.put("/:id/status", protect, admin, updateMessIssueStatus)

module.exports = router
