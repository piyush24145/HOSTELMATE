const router = require("express").Router()
const { applyLeave, myLeaves, getAllLeaves, approveLeave } = require("../Controllers/leaveController")
const { protect, admin } = require("../middlewares/authMiddleware")


router.post("/apply",protect,applyLeave)
router.get("/mine",protect,myLeaves)
router.get("/admin/all",protect,admin,getAllLeaves)
router.put("/admin/approve/:id",protect,admin,approveLeave)

module.exports = router
