import { useEffect, useState } from "react"
import axios from "axios"
import { Star, MessageSquare, TrendingUp } from "lucide-react"

const MessAnalytics = () => {
  const [data, setData] = useState({ totalFeedbacks: 0, averageRating: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/mess/admin`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setData(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">Mess Feedback Analytics</h2>
        <p className="text-slate-400 text-sm">Student satisfaction insights</p>
      </div>

      {loading ? (
        <div className="text-center text-slate-400 py-10">Loading analytics...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Total Feedbacks Card */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex items-center gap-6 shadow-xl">
            <div className="p-4 bg-blue-500/20 rounded-2xl text-blue-400">
              <MessageSquare size={32} />
            </div>
            <div>
              <h3 className="text-slate-400 font-medium">Total Feedbacks</h3>
              <p className="text-4xl font-bold text-white mt-1">{data.totalFeedbacks || 0}</p>
            </div>
          </div>

          {/* Average Rating Card */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex items-center gap-6 shadow-xl">
            <div className="p-4 bg-yellow-500/20 rounded-2xl text-yellow-400">
              <Star size={32} fill="currentColor" />
            </div>
            <div>
              <h3 className="text-slate-400 font-medium">Average Rating</h3>
              <div className="flex items-end gap-2 mt-1">
                <p className="text-4xl font-bold text-white">{data.averageRating || 0}</p>
                <span className="text-slate-500 mb-1">/ 5.0</span>
              </div>
            </div>
          </div>

          {/* Satisfaction Trend (Mock) */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex items-center gap-6 shadow-xl">
            <div className="p-4 bg-green-500/20 rounded-2xl text-green-400">
              <TrendingUp size={32} />
            </div>
            <div>
              <h3 className="text-slate-400 font-medium">Satisfaction Trend</h3>
              <p className="text-4xl font-bold text-white mt-1">Positive</p>
            </div>
          </div>

        </div>
      )}

      {/* Suggestion: Add chart here later if data is available */}

    </div>
  )
}

export default MessAnalytics
