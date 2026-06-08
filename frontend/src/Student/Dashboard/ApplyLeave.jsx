import axios from "axios"
import { useState } from "react"
import { Send, CalendarDays, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

function ApplyLeave() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    reason: "",
    fromDate: "",
    toDate: "",
    leaveType: "Personal",
    emergency: false
  })

  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!form.reason || !form.fromDate || !form.toDate) {
      alert("Please fill all required fields")
      return
    }

    try {
      setLoading(true)
      const token = localStorage.getItem("token")

      await axios.post(
       `${import.meta.env.VITE_API_URL}/api/leave/apply`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      alert("Leave Applied Successfully ✅")
      navigate("/student/myleave"); // Corrected route to match App.jsx
      setForm({
        reason: "",
        fromDate: "",
        toDate: "",
        leaveType: "Personal",
        emergency: false
      })

    } catch (err) {
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center pt-10">

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6">

        <h2 className="text-2xl font-extrabold text-white text-center mb-1">
          Apply for <span className="text-blue-400">Leave</span>
        </h2>

        <p className="text-center text-slate-400 text-xs mb-6">
          Request leave approval from hostel warden
        </p>

        <div className="space-y-4">

          {/* Leave Type */}
          <div>
            <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">Leave Type</label>
            <select
              className="w-full mt-1 p-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50 appearance-none text-sm"
              value={form.leaveType}
              onChange={e => setForm({ ...form, leaveType: e.target.value })}
            >
              <option className="bg-slate-800">Personal</option>
              <option className="bg-slate-800">Medical</option>
              <option className="bg-slate-800">Emergency</option>
              <option className="bg-slate-800">Family</option>
            </select>
          </div>

          {/* Reason */}
          <div>
            <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">
              Reason
            </label>
            <textarea
              className="w-full mt-1 p-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 text-sm h-20 resize-none"
              placeholder="Brief reason for your leave..."
              value={form.reason}
              onChange={e => setForm({ ...form, reason: e.target.value })}
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">From</label>
              <div className="relative mt-1">
                <CalendarDays
                  size={16}
                  className="absolute left-3 top-2.5 text-blue-400"
                />
                <input
                  type="date"
                  className="w-full pl-9 p-2 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50 text-sm"
                  value={form.fromDate}
                  onChange={e => setForm({ ...form, fromDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">To</label>
              <div className="relative mt-1">
                <CalendarDays
                  size={16}
                  className="absolute left-3 top-2.5 text-blue-400"
                />
                <input
                  type="date"
                  className="w-full pl-9 p-2 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50 text-sm"
                  value={form.toDate}
                  onChange={e => setForm({ ...form, toDate: e.target.value })}
                />
              </div>
            </div>

          </div>

          {/* Emergency */}
          <div className="flex items-center gap-2 mt-2 bg-red-500/10 p-2 rounded-lg border border-red-500/20">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-red-500 text-red-500 focus:ring-red-500 bg-transparent"
              checked={form.emergency}
              onChange={e =>
                setForm({ ...form, emergency: e.target.checked })
              }
            />
            <span className="text-xs font-bold text-red-400">Mark as Emergency Request</span>
          </div>

          {/* Submit */}
          <button
            onClick={submit}
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Send size={18} />
            {loading ? "Submitting..." : "Submit Leave Application"}
          </button>
        </div>

      </div>
    </div>
  )
}

export default ApplyLeave
