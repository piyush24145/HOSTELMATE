const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "../.env") })
const express = require("express")
const cors = require("cors")
const http = require("http")

const connectDB = require("./config/db")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))

// Database
connectDB()

// Routes
app.use("/api/auth", require("./Routes/authRoutes"))
app.use("/api/complaints", require("./Routes/complaintRoutes"))
app.use("/api/leave", require("./Routes/leaveRoutes"))
app.use("/api/mess", require("./Routes/messRoutes"))
// Test Route
app.get("/", (req, res) => {
  res.send("Hostel Complaint Backend Running 🚀")
})

// HTTP Server
const server = http.createServer(app)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
