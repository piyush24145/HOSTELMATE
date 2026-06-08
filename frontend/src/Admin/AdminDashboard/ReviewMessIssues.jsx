import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Clock, XCircle, AlertCircle, Filter } from "lucide-react";

const ReviewMessIssues = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("All");

    // Fetch all issues (admin)
    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        try {
            setLoading(true);
            const res = await axios.get( `${import.meta.env.VITE_API_URL}/api/mess`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setIssues(res.data);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message || "Failed to load mess complaints");
        } finally {
            setLoading(false);
        }
    };

    // Change status of a complaint
    const changeStatus = async (id, status) => {
        try {
            await axios.put(
             `${import.meta.env.VITE_API_URL}/api/mess/${id}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            // Update local state immediately
            setIssues((prev) =>
                prev.map((i) => (i._id === id ? { ...i, status } : i))
            );
        } catch (err) {
            console.error(err);
            alert(
                err.response?.data?.message || err.message || "Status update failed"
            );
        }
    };

    const filteredIssues = filter === "All" ? issues : issues.filter(i => i.status === filter);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                <p className="text-red-400">{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl mb-2">
                        Review <span className="text-purple-400">Mess Complaints</span>
                    </h1>
                    <p className="text-slate-400">
                        Manage and resolve student complaints regarding the mess facility.
                    </p>
                </div>

                {/* Filter */}
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none min-w-[150px]"
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>
            </div>

            {filteredIssues.length === 0 ? (
                <div className="text-center p-12 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                    <p className="text-slate-400 text-lg">No mess complaints found.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredIssues.map((i) => (
                        <div
                            key={i._id}
                            className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all duration-300 flex flex-col md:flex-row justify-between gap-4"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-bold text-lg text-white">{i.studentName}</h3>
                                    <span className="text-xs font-medium text-slate-400 px-2 py-0.5 bg-white/5 rounded border border-white/5">
                                        {i.mealType}
                                    </span>
                                </div>

                                <p className="text-purple-300 text-sm font-medium mb-1">{i.issueType}</p>
                                <p className="text-slate-300 text-sm leading-relaxed">{i.description}</p>

                                <p className="text-xs text-slate-500 mt-3">
                                    Reported: {new Date(i.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 min-w-[200px] justify-end">
                                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${i.status === 'Resolved' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                    i.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                        'bg-red-500/20 text-red-400 border border-red-500/30'
                                    }`}>
                                    {i.status}
                                </div>

                                <select
                                    value={i.status}
                                    onChange={(e) => changeStatus(i._id, e.target.value)}
                                    className="bg-slate-900 border border-slate-700 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewMessIssues;
