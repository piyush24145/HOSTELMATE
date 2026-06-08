const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../model/User")

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    const hash = await bcrypt.hash(password, 10)

    const user = new User({
      name,
      email,
      password: hash,
      role   // student OR admin
    })

    await user.save()   // ✅ FIX

    res.json({ message: "Registered Successfully" })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Register failed" })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json("User not found")

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json("Wrong password")

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET   // ✅ FIX
    )

    res.json({
      token,
      role: user.role
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Login failed" })
  }
}

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    if (!user) return res.status(404).json({ message: "User not found" })
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error getting profile" })
  }
}
