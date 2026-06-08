import axios from "axios"
import { useEffect, useState } from "react"

const MessPage = () => {

  const [menu, setMenu] = useState(null)
  const [loading, setLoading] = useState(true)

  const [rating, setRating] = useState("")
  const [comment, setComment] = useState("")

  useEffect(() => {
    loadMenu()
  }, [])

  // ================= LOAD MENU =================
  const loadMenu = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/mess/today`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      setMenu(res.data)

    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  // ================= SUBMIT FEEDBACK =================
  const submitFeedback = async () => {
    try {
      const token = localStorage.getItem("token")

      await axios.post(
       `${import.meta.env.VITE_API_URL}/api/mess/create`,
        { rating, comment },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      alert("Feedback Submitted Successfully ✅")
      setRating("")
      setComment("")

    } catch (err) {
      console.log(err)
      alert("Error sending feedback")
    }
  }

  // ================= UI =================

  if (loading) return (
    <div className="flex justify-center items-center py-20">
      <span className="text-slate-400 animate-pulse">Loading Menu...</span>
    </div>
  )
  if (!menu) return (
    <div className="text-center py-20">
      <p className="text-slate-400">No Menu Available Today</p>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto">

      <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight text-center">
        🍽️ Today's <span className="text-amber-400">Mess Menu</span>
      </h2>
      <p className="text-slate-400 text-center mb-8 font-medium">
        Menu for {new Date(menu.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      {/* Breakfast */}
      <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl mb-6 shadow-lg overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <span className="text-6xl">🍳</span>
        </div>
        <h3 className="text-xl font-bold text-amber-200 mb-4 flex items-center gap-2">Breakfast</h3>
        <div className="space-y-2">
          {menu.breakfast.map((i, idx) =>
            <p key={idx} className="text-slate-200 flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
              {i}
            </p>
          )}
        </div>
      </div>

      {/* Lunch */}
      <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl mb-6 shadow-lg overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <span className="text-6xl">🍛</span>
        </div>
        <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center gap-2">Lunch</h3>
        <div className="space-y-2">
          {menu.lunch.map((i, idx) =>
            <p key={idx} className="text-slate-200 flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
              {i}
            </p>
          )}
        </div>
      </div>

      {/* Dinner */}
      <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl mb-8 shadow-lg overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <span className="text-6xl">🌙</span>
        </div>
        <h3 className="text-xl font-bold text-indigo-300 mb-4 flex items-center gap-2">Dinner</h3>
        <div className="space-y-2">
          {menu.dinner.map((i, idx) =>
            <p key={idx} className="text-slate-200 flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
              {i}
            </p>
          )}
        </div>
      </div>

      {/* Feedback Section */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg">

        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          📝 Give Mess Feedback
        </h3>

        <select
          value={rating}
          onChange={e => setRating(e.target.value)}
          className="w-full mb-4 p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-amber-500/50 appearance-none"
        >
          <option value="" className="bg-slate-800 text-slate-400">Select Rating</option>
          <option value="5" className="bg-slate-800">⭐⭐⭐⭐⭐ - Excellent</option>
          <option value="4" className="bg-slate-800">⭐⭐⭐⭐ - Good</option>
          <option value="3" className="bg-slate-800">⭐⭐⭐ - Average</option>
          <option value="2" className="bg-slate-800">⭐⭐ - Poor</option>
          <option value="1" className="bg-slate-800">⭐ - Very Poor</option>
        </select>

        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Write your feedback..."
          className="w-full mb-4 p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500/50 h-24 resize-none"
        />

        <button
          onClick={submitFeedback}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          Submit Feedback
        </button>

      </div>

    </div>
  )
}

export default MessPage
