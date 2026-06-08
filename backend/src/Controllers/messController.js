const Menu = require("../model/Menu")
const MessFeedback = require("../model/MessFeedback")
const MessIssue = require("../model/MessIssue")

// ================= CREATE / UPDATE MENU =================
exports.createMenu = async (req, res) => {
  try {

    const { date, breakfast, lunch, dinner } = req.body

    const existing = await Menu.findOne({ date })

    if (existing) {
      existing.breakfast = breakfast
      existing.lunch = lunch
      existing.dinner = dinner
      await existing.save()

      return res.json({ message: "Menu Updated" })
    }

    await Menu.create({ date, breakfast, lunch, dinner })

    res.json({ message: "Menu Created" })

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Menu save failed" })
  }
}

// ================= GET TODAY MENU =================
exports.getTodayMenu = async (req, res) => {
  try {
    // Get current date string in YYYY-MM-DD format (en-CA locale guarantees YYYY-MM-DD)
    const todayStr = new Date().toLocaleDateString('en-CA');
    const todayDate = new Date(todayStr); // Parsed as UTC midnight, matching how input type="date" is stored

    let menu = await Menu.findOne({ date: todayDate });

    if (!menu) {
      // Fallback 1: Date range match in server local time
      const start = new Date()
      start.setHours(0,0,0,0)
      const end = new Date()
      end.setHours(23,59,59,999)

      menu = await Menu.findOne({
        date: { $gte: start, $lte: end }
      });
    }

    if (!menu) {
      // Fallback 2: Find the closest upcoming menu (closest to today)
      menu = await Menu.findOne({ date: { $gte: todayDate } }).sort({ date: 1 });
    }

    if (!menu) {
      // Fallback 3: Find the most recent past menu
      menu = await Menu.findOne({ date: { $lt: todayDate } }).sort({ date: -1 });
    }

    if (!menu) {
      return res.status(404).json({ message: "No menu available" })
    }

    res.json(menu)

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}

exports.createFeedback = async (req, res) => {
  try {

    const feedback = await MessFeedback.create({
      user: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment
    })

    res.json({ message: "Feedback Saved", feedback })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Feedback failed" })
  }
}


// ================= GET ALL FEEDBACK (ADMIN) =================
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await MessFeedback.find()
      .populate("user", "name email")
      .sort({ date: -1 })

    const totalFeedbacks = feedbacks.length;
    const averageRating = totalFeedbacks > 0
      ? parseFloat((feedbacks.reduce((acc, f) => acc + (f.rating || 0), 0) / totalFeedbacks).toFixed(1))
      : 0;

    res.json({
      totalFeedbacks,
      averageRating,
      feedbacks
    })

  } catch (error) {
    res.status(500).json({ message: "Failed to load feedback" })
  }
}

// ================= CREATE MESS ISSUE =================
exports.createMessIssue = async (req, res) => {
  try {
    const { issueType, mealType, description } = req.body;
    
    if (!issueType || !mealType || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const issue = await MessIssue.create({
      student: req.user.id,
      issueType,
      mealType,
      description
    });

    res.status(201).json({ message: "Mess issue created successfully", issue });
  } catch (error) {
    console.error("Create mess issue error:", error);
    res.status(500).json({ message: "Server error creating mess issue" });
  }
};

// ================= GET STUDENT'S MESS ISSUES =================
exports.getMyMessIssues = async (req, res) => {
  try {
    const issues = await MessIssue.find({ student: req.user.id }).sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    console.error("Get my mess issues error:", error);
    res.status(500).json({ message: "Server error fetching mess issues" });
  }
};

// ================= GET ALL MESS ISSUES (ADMIN) =================
exports.getAllMessIssues = async (req, res) => {
  try {
    const issues = await MessIssue.find()
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    const formattedIssues = issues.map(issue => ({
      _id: issue._id,
      studentName: issue.student ? issue.student.name : "Unknown Student",
      issueType: issue.issueType,
      mealType: issue.mealType,
      description: issue.description,
      status: issue.status,
      createdAt: issue.createdAt
    }));

    res.json(formattedIssues);
  } catch (error) {
    console.error("Get all mess issues error:", error);
    res.status(500).json({ message: "Server error fetching mess complaints" });
  }
};

// ================= UPDATE MESS ISSUE STATUS (ADMIN) =================
exports.updateMessIssueStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const issue = await MessIssue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: "Mess issue not found" });
    }

    issue.status = status;
    await issue.save();

    res.json({ message: "Status updated successfully", issue });
  } catch (error) {
    console.error("Update mess issue status error:", error);
    res.status(500).json({ message: "Server error updating status" });
  }
};
