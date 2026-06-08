const { register, login, getMe } = require("../Controllers/authController")
const { protect } = require("../middlewares/authMiddleware")

const router = require("express").Router()

router.post("/register", register)
router.post("/login", login)
router.get("/me", protect, getMe)

module.exports = router
