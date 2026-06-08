const jwt = require("jsonwebtoken");

// ================= PROTECT ROUTES =================
exports.protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ id, role, email available
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ================= ADMIN ONLY =================
exports.admin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};
