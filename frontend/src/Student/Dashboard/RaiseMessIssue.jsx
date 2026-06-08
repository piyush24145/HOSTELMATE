import { useState } from "react"
import axios from "axios"
import { UtensilsCrossed } from "lucide-react"
import { useNavigate } from "react-router-dom";

const RaiseMessIssue = () => {
     const Navigate=useNavigate();
    const [form, setForm] = useState({
        issueType: "",
        mealType: "",
        description: ""
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/mess/issue/create`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )

            alert("Mess complaint submitted")
Navigate("/student/my-mess-issues");
            setForm({
                issueType: "",
                mealType: "",
                description: ""
            })
        } catch (err) {
            console.error(err)
            alert("Failed to submit complaint")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* HEADER SECTION */}
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl mb-4">
                    Raise <span className="text-blue-400">Mess Issue</span>
                </h1>
                <p className="text-lg text-slate-300">
                    Report hygiene, food quality, or quantity issues directly to the administration.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl space-y-6">

                <div className="flex items-center justify-center mb-6">
                    <div className="bg-blue-500/20 p-4 rounded-full">
                        <UtensilsCrossed className="w-12 h-12 text-blue-400" />
                    </div>
                </div>

                {/* Issue Type */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Issue Type</label>
                    <select
                        value={form.issueType}
                        onChange={e => setForm({ ...form, issueType: e.target.value })}
                        className="w-full p-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
                        required
                    >
                        <option value="" className="bg-slate-900 text-slate-400">Select Issue Type</option>
                        <option value="Food Quality" className="bg-slate-900">Food Quality</option>
                        <option value="Hygiene" className="bg-slate-900">Hygiene</option>
                        <option value="Menu Issue" className="bg-slate-900">Menu Issue</option>
                        <option value="Quantity" className="bg-slate-900">Quantity</option>
                        <option value="Other" className="bg-slate-900">Other</option>
                    </select>
                </div>

                {/* Meal Type */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Meal Type</label>
                    <select
                        value={form.mealType}
                        onChange={e => setForm({ ...form, mealType: e.target.value })}
                        className="w-full p-3 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
                        required
                    >
                        <option value="" className="bg-slate-900 text-slate-400">Select Meal</option>
                        <option value="Breakfast" className="bg-slate-900">Breakfast</option>
                        <option value="Lunch" className="bg-slate-900">Lunch</option>
                        <option value="Dinner" className="bg-slate-900">Dinner</option>
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                    <textarea
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                        placeholder="Describe the issue in detail..."
                        className="w-full p-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-32 resize-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-3.5 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Submitting..." : "Submit Complaint"}
                </button>
            </form>
        </div>
    )
}

export default RaiseMessIssue
