import axios from "axios"
import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"
import { FileDown, FileBarChart, CheckCircle, Clock, AlertCircle } from "lucide-react"

import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

const ViewReports = () => {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  // ================= FETCH COMPLAINTS =================
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/complaints/admin/complaints`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setComplaints(res.data)
      } catch (err) {
        console.log("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchComplaints()
  }, [])

  // ================= ANALYTICS =================
  const total = complaints.length
  const resolved = complaints.filter(c => c.status === "Resolved").length
  const pending = complaints.filter(c => c.status === "Pending").length
  const inProgress = complaints.filter(c => c.status === "In Progress").length

  const categoryCount = complaints.reduce((acc, c) => {
    acc[c.type] = (acc[c.type] || 0) + 1
    return acc
  }, {})

  const chartData = Object.keys(categoryCount).map(key => ({
    category: key,
    count: categoryCount[key]
  }))

  // ================= PDF EXPORT =================
  const exportPDF = () => {
    const doc = new jsPDF("p", "mm", "a4")

    // Title
    doc.setFontSize(18)
    doc.text("Hostel Complaints Report", 14, 20)

    // Date
    doc.setFontSize(11)
    doc.text(`Generated On: ${new Date().toLocaleString()}`, 14, 28)

    // Summary
    doc.setFontSize(12)
    doc.text(`Total Complaints: ${total}`, 14, 40)
    doc.text(`Resolved: ${resolved}`, 14, 47)
    doc.text(`Pending: ${pending}`, 14, 54)
    doc.text(`In Progress: ${inProgress}`, 14, 61)

    // Table
    autoTable(doc, {
      startY: 70,
      head: [["ID", "Type", "Room", "Description", "Date", "Status"]],
      body: complaints.map(c => [
        c._id,
        c.type,
        c.room,
        c.description,
        new Date(c.createdAt).toLocaleDateString(),
        c.status
      ])
    })

    doc.save("complaints_report.pdf")
  }

  if (loading) {
    return <p className="text-center mt-10 text-slate-400">Loading Reports...</p>
  }

  return (
    <div className="min-h-screen">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">System Reports</h2>
          <p className="text-slate-400 text-sm">Analytics and data export</p>
        </div>

        <button
          onClick={exportPDF}
          className="w-full sm:w-auto px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          <FileDown size={18} />
          Export PDF
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center">
          <p className="text-slate-400 mb-1 flex justify-center items-center gap-2"><FileBarChart size={16} /> Total</p>
          <p className="text-3xl font-bold text-white">{total}</p>
        </div>

        <div className="bg-green-500/10 backdrop-blur-md p-6 rounded-2xl border border-green-500/20 text-center">
          <p className="text-green-400 mb-1 flex justify-center items-center gap-2"><CheckCircle size={16} /> Resolved</p>
          <p className="text-3xl font-bold text-green-400">{resolved}</p>
        </div>

        <div className="bg-yellow-500/10 backdrop-blur-md p-6 rounded-2xl border border-yellow-500/20 text-center">
          <p className="text-yellow-400 mb-1 flex justify-center items-center gap-2"><AlertCircle size={16} /> Pending</p>
          <p className="text-3xl font-bold text-yellow-400">{pending}</p>
        </div>

        <div className="bg-blue-500/10 backdrop-blur-md p-6 rounded-2xl border border-blue-500/20 text-center">
          <p className="text-blue-400 mb-1 flex justify-center items-center gap-2"><Clock size={16} /> In Progress</p>
          <p className="text-3xl font-bold text-blue-400">{inProgress}</p>
        </div>

      </div>

      {/* BAR CHART */}
      <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl">
        <h3 className="font-bold text-white text-xl mb-6">Complaint Categories</h3>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="category" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}

export default ViewReports
