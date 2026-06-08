import axios from "axios"
import { useEffect, useState } from "react"
import jsPDF from "jspdf"
import { FileText, Calendar, CheckCircle, XCircle, Clock, Download } from "lucide-react"

function MyLeaves() {

    const [leaves, setLeaves] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadLeaves()
    }, [])

    const loadLeaves = async () => {
        try {
            const token = localStorage.getItem("token")
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/leave/mine`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setLeaves(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // PDF DOWNLOAD
    const downloadSlip = (leave) => {
        const doc = new jsPDF()

        doc.setFontSize(16)
        doc.text("HOSTEL LEAVE APPROVAL SLIP", 20, 20)

        doc.setFontSize(12)
        doc.text(`Reason : ${leave.reason}`, 20, 40)
        doc.text(`From Date : ${leave.fromDate}`, 20, 50)
        doc.text(`To Date : ${leave.toDate}`, 20, 60)
        doc.text(`Status : ${leave.status}`, 20, 70)

        doc.save("leave-slip.pdf")
    }

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-slate-900 text-white">
                Loading...
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto">

            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    My <span className="text-blue-400">Leaves</span>
                </h2>
                <div className="bg-white/10 px-4 py-2 rounded-full border border-white/10 text-slate-300 text-sm">
                    Total Requests: <span className="text-white font-bold">{leaves.length}</span>
                </div>
            </div>

            {leaves.length === 0 ? (
                <div className="text-center py-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                    <FileText size={48} className="mx-auto text-slate-500 mb-4" />
                    <p className="text-slate-400 text-lg">No leave requests found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {leaves.map(l => (
                        <div
                            key={l._id}
                            className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 shadow-xl flex flex-col justify-between group"
                        >

                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`
            flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border
            ${l.status === "Approved" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                                            l.status === "Rejected" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                                                "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"}
          `}>
                                        {l.status === "Approved" ? <CheckCircle size={12} /> : l.status === "Rejected" ? <XCircle size={12} /> : <Clock size={12} />}
                                        {l.status}
                                    </span>
                                    <span className="text-slate-500 text-xs font-mono">#{l._id.slice(-4)}</span>
                                </div>

                                <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1" title={l.reason}>
                                    {l.reason}
                                </h3>

                                <div className="space-y-2 mt-4">
                                    <div className="flex items-center gap-3 text-slate-300 text-sm bg-black/20 p-2 rounded-lg">
                                        <Calendar size={16} className="text-blue-400" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-500 uppercase">From</span>
                                            <span className="font-medium">{new Date(l.fromDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-slate-300 text-sm bg-black/20 p-2 rounded-lg">
                                        <Calendar size={16} className="text-blue-400" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-500 uppercase">To</span>
                                            <span className="font-medium">{new Date(l.toDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/10">
                                {l.status === "Approved" ? (
                                    <button
                                        onClick={() => downloadSlip(l)}
                                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2.5 rounded-xl hover:shadow-lg hover:shadow-green-500/20 transition-all font-medium text-sm group-hover:scale-[1.02]"
                                    >
                                        <Download size={16} />
                                        Download Slip
                                    </button>
                                ) : (
                                    <div className="text-center text-xs text-slate-500 italic py-2">
                                        Slip available after approval
                                    </div>
                                )}
                            </div>

                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default MyLeaves
