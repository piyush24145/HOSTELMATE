import { useState } from "react"
import axios from "axios"
import { Calendar, Coffee, Utensils, Moon, Save, UtensilsCrossed } from "lucide-react"

const CreateMenu = () => {

  const [form, setForm] = useState({
    date: "",
    breakfast: "",
    lunch: "",
    dinner: ""
  })

  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const saveMenu = async () => {
    if (!form.date || !form.breakfast || !form.lunch || !form.dinner) {
      alert("Please fill all fields")
      return
    }

    setLoading(true)
    const token = localStorage.getItem("token")

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/mess/admin/create`,
        {
          date: form.date,
          breakfast: form.breakfast.split(","),
          lunch: form.lunch.split(","),
          dinner: form.dinner.split(",")
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      alert("Menu Saved Successfully ✅")
      setForm({ date: "", breakfast: "", lunch: "", dinner: "" })
    } catch (error) {
      console.error(error)
      alert("Failed to save menu")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-start pt-10">

      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl">

        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-purple-500/20 rounded-full mb-4 text-purple-300">
            <UtensilsCrossed size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white">
            Create Mess Menu
          </h2>
          <p className="text-slate-400">Plan daily meals for students</p>
        </div>

        <div className="space-y-6">

          {/* Date */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 block">Select Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
          </div>

          {/* Breakfast */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 block">Breakfast (comma separated)</label>
            <div className="relative">
              <Coffee className="absolute left-3 top-3 text-yellow-400" size={18} />
              <input
                name="breakfast"
                value={form.breakfast}
                placeholder="e.g. Poha, Tea, Milk"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
              />
            </div>
          </div>

          {/* Lunch */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 block">Lunch</label>
            <div className="relative">
              <Utensils className="absolute left-3 top-3 text-orange-400" size={18} />
              <input
                name="lunch"
                value={form.lunch}
                placeholder="e.g. Rice, Dal, Paneer, Roti"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
            </div>
          </div>

          {/* Dinner */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 block">Dinner</label>
            <div className="relative">
              <Moon className="absolute left-3 top-3 text-blue-400" size={18} />
              <input
                name="dinner"
                value={form.dinner}
                placeholder="e.g. Fried Rice, Manchurian, Salad"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>

          <button
            onClick={saveMenu}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            <Save size={18} />
            {loading ? "Saving Menu..." : "Publish Menu"}
          </button>

        </div>

      </div>

    </div>
  )
}

export default CreateMenu
