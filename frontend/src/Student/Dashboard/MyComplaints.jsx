import { useEffect, useState } from "react"
import axios from "axios"
import { AlertCircle, Clock, Trash2, CheckCircle, XCircle } from "lucide-react"

const MyComplaints = () => {

  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem("token")

  // ✅ FETCH MY COMPLAINTS
  const fetchComplaints = async () => {
    try {
      // Fixed endpoint from /api/complaints/my to /api/complaint/my
      const res = await axios.get(
         `${import.meta.env.VITE_API_URL}/api/complaints/my`, // Reverted to correct plural endpoint
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      let data = res.data
      if (data.complaints) data = data.complaints
      if (!Array.isArray(data)) data = []

      setComplaints(data)
    } catch (error) {
      console.log(error)
      // alert("Failed to load complaints") // specific errors usually better
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComplaints()
  }, [])

  // ✅ DELETE COMPLAINT
const handleDelete = async (id) => {
  if (!window.confirm("Delete this complaint?")) return;

  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/complaints/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setComplaints((prev) => prev.filter((c) => c._id !== id));
  } catch (error) {
    console.log(error);
    alert("Delete failed");
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-900 text-white">
        Loading...
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold text-white mb-8 tracking-tight">My <span className="text-blue-400">Complaints</span></h2>

      {complaints.length === 0 ? (
        <div className="text-center py-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
          <AlertCircle size={48} className="mx-auto text-slate-500 mb-4" />
          <p className="text-slate-400 text-lg">No complaints raised yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {complaints.map((c) => (
            <div
              key={c._id}
              className="
                  bg-white/10 backdrop-blur-md border border-white/10
                  p-6 rounded-2xl shadow-lg
                  flex flex-col md:flex-row justify-between items-start gap-4
                  hover:bg-white/15 transition-all duration-300
                "
            >

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                    {c.type}
                  </span>
                  <span className="text-xs text-slate-500 font-mono text-opacity-50">#{c._id.slice(-6)}</span>
                </div>

                <p className="text-slate-300 text-sm mb-1">
                  <span className="text-slate-500">Room:</span> {c.room}
                </p>

                <p className="text-white text-base leading-relaxed mb-4 font-medium">
                  {c.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock size={14} />
                  Raised on: {new Date(c.createdAt).toLocaleString()}
                </div>

                {/* 🧭 TIMELINE */}
                {c.timeline?.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-2">History</p>
                    <div className="space-y-2">
                      {c.timeline.map((t, i) => (
                        <div key={i} className="flex gap-2 text-xs text-slate-400">
                          <span>•</span>
                          <span>{new Date(t.time).toLocaleString()}</span>
                          <span className="text-slate-600">-</span>
                          <span className="font-medium text-slate-300">{t.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                <span
                  className={`
                      flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border
                      ${c.status === "Resolved"
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                    }
                    `}
                >
                  {c.status === "Resolved" ? <CheckCircle size={16} /> : <Clock size={16} />}
                  {c.status}
                </span>

                <button
                  onClick={() => handleDelete(c._id)}
                  className="
                      flex items-center gap-2 px-4 py-2 rounded-xl
                      text-xs font-medium text-red-400
                      hover:bg-red-500/10 hover:text-red-300
                      transition-colors
                    "
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyComplaints
