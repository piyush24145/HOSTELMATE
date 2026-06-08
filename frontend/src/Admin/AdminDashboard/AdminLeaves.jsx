import axios from "axios"
import { useEffect, useState } from "react"
import { CheckCircle, XCircle, Clock, Calendar, User, FileText, AlertCircle } from "lucide-react"

function AdminLeaves() {

    const [leaves, setLeaves] = useState([])
    const [loading, setLoading] = useState(true)

    const load = async () => {
        setLoading(true)
        const token = localStorage.getItem("token")
        try {
            const res = await axios.get(
 `${import.meta.env.VITE_API_URL}/api/leave/admin/all`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setLeaves(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { load() }, [])

    const approve = async (id) => {
        const token = localStorage.getItem("token")
        try {
            await axios.put(
 `${import.meta.env.VITE_API_URL}/api/leave/admin/approve/${id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            )
            load()
        } catch (error) {
            alert("Failed to approve leave")
        }
    }

    const reject = async (id) => {
        const token = localStorage.getItem("token")
        try {
            await axios.put(
                 `${import.meta.env.VITE_API_URL}/api/leave/admin/reject/${id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            )
            load()
        } catch (error) {
            alert("Failed to reject leave")
        }
    }

    return (
        <div className="min-h-screen">

            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">Leave Approvals</h2>
                <p className="text-slate-400 text-sm">Review/approve student leave requests</p>
            </div>

            {loading ? (
                <div className="text-center text-slate-400 py-10">Loading requests...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {leaves.length === 0 && (
                        <div className="col-span-full text-center py-10 text-slate-500 bg-white/5 rounded-2xl border border-white/5">
                            <AlertCircle className="mx-auto mb-2 opacity-50" size={32} />
                            No leave requests found
                        </div>
                    )}

                    {leaves.map(l => (
                        <div
                            key={l._id}
                            className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-lg hover:bg-white/15 transition-all relative"
                        >
                            {/* Status Badge */}
                            <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-xl
                                ${l.status === 'Approved' ? 'bg-green-500/20 text-green-400' :
                                    l.status === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                                        'bg-yellow-500/20 text-yellow-400'}
                            `}>
                                {l.status}
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-300">
                                    <User size={20} />
                                </div>
                                <h3 className="font-bold text-lg text-white">
                                    {l.student?.name || "Unknown Student"}
                                </h3>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-2 text-slate-300 text-sm">
                                    <FileText size={16} className="text-slate-500" />
                                    <span>{l.reason}</span>
                                </div>

                                <div className="flex items-center gap-2 text-slate-300 text-sm">
                                    <Calendar size={16} className="text-slate-500" />
                                    <span>{new Date(l.fromDate).toLocaleDateString()} - {new Date(l.toDate).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* ACTION BUTTONS */}
                            {l.status === "Pending" ? (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => approve(l._id)}
                                        className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle size={18} />
                                        Approve
                                    </button>

                                    <button
                                        onClick={() => reject(l._id)}
                                        className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        <XCircle size={18} />
                                        Reject
                                    </button>
                                </div>
                            ) : (
                                <div className="w-full bg-white/5 border border-white/10 text-slate-400 font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-default">
                                    {l.status === "Approved"
                                        ? <CheckCircle size={18} className="text-green-500" />
                                        : <XCircle size={18} className="text-red-500" />
                                    }
                                    {l.status}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AdminLeaves
