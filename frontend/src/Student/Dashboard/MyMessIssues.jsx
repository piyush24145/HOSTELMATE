import { useState, useEffect } from "react"
import axios from "axios"
import { AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react"

const MyMessIssues = () => {
    const [issues, setIssues] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const res = await axios.get( `${import.meta.env.VITE_API_URL}/api/mess/my`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setIssues(res.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchIssues()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* HEADER */}
            <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl mb-4">
                    My <span className="text-blue-400">Mess Issues</span>
                </h1>
                <p className="text-lg text-slate-300">
                    Track the status of your reported mess complaints.
                </p>
            </div>

            {issues.length === 0 ? (
                <div className="text-center p-12 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md flex flex-col items-center justify-center">
                    <div className="bg-slate-800 p-4 rounded-full mb-4">
                        <AlertCircle className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No Issues Reported</h3>
                    <p className="text-slate-400 text-lg">You haven't reported any mess issues yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {issues.map(i => (
                        <div key={i._id} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group shadow-lg flex flex-col h-full hover:-translate-y-1">

                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors capitalize">
                                        {i.issueType}
                                    </h3>
                                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wide bg-white/5 px-2 py-1 rounded mt-1 inline-block">
                                        {i.mealType}
                                    </span>
                                </div>

                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${i.status === 'Resolved' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                        i.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                            'bg-red-500/20 text-red-400 border border-red-500/30'
                                    }`}>
                                    {i.status === 'Resolved' && <CheckCircle className="w-3 h-3" />}
                                    {i.status === 'In Progress' && <Clock className="w-3 h-3" />}
                                    {i.status === 'Pending' && <AlertCircle className="w-3 h-3" />}
                                    {i.status}
                                </span>
                            </div>

                            <div className="flex-grow">
                                <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-4 bg-black/20 p-3 rounded-lg border border-white/5">
                                    {i.description}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs text-slate-500 mt-auto">
                                <span>Reported on: <span className="text-slate-400">{new Date(i.createdAt).toLocaleDateString()}</span></span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyMessIssues
