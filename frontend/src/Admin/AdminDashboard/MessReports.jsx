import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart3, TrendingUp, AlertTriangle } from "lucide-react";

const MessReports = () => {
   
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchReports = async () => {
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
            setError(
                err.response?.data?.message || err.message || "Failed to fetch mess reports"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    // Group issues by "Issue Type • Meal Type"
    const groupedIssues = issues.reduce((acc, issue) => {
        const key = `${issue.issueType} • ${issue.mealType}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(issue.studentName);
        return acc;
    }, {});

    // Sort groups by most demanding (most complaints)
    const sortedGroups = Object.entries(groupedIssues).sort(
        (a, b) => b[1].length - a[1].length
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
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

    const totalIssues = issues.length;
    const resolved = issues.filter((i) => i.status === "Resolved").length;
    const pending = issues.filter((i) => i.status === "Pending").length;
    const resolutionRate = totalIssues > 0 ? Math.round((resolved / totalIssues) * 100) : 0;

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl mb-2">
                    Mess <span className="text-pink-400">Reports & Analytics</span>
                </h1>
                <p className="text-slate-400">
                    Insights into mess complaints and recurring issues.
                </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Total Complaints</p>
                            <p className="text-2xl font-bold text-white">{totalIssues}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Resolution Rate</p>
                            <p className="text-2xl font-bold text-white">{resolutionRate}%</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-500/20 rounded-lg text-red-400">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Pending Actions</p>
                            <p className="text-2xl font-bold text-white">{pending}</p>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
                Top Recurring Issues
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedGroups.map(([group, students], index) => (
                    <div
                        key={group}
                        className={`p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 ${index < 3
                                ? "bg-gradient-to-br from-pink-500/10 to-purple-600/10 border-pink-500/30 shadow-lg shadow-pink-500/5"
                                : "bg-white/5 border-white/10"
                            }`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-lg text-white">{group}</h4>
                            {index < 3 && (
                                <span className="bg-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow">
                                    High Priority
                                </span>
                            )}
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between text-sm text-slate-400 mb-1">
                                <span>Impact</span>
                                <span>{students.length} Reports</span>
                            </div>
                            <div className="w-full bg-slate-700/50 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full"
                                    style={{ width: `${Math.min((students.length / totalIssues) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/5">
                            <p className="text-xs text-slate-500 mb-2">Reported by:</p>
                            <div className="flex flex-wrap gap-2">
                                {Array.from(new Set(students)).slice(0, 5).map((student, i) => (
                                    <span key={i} className="text-xs text-slate-300 bg-white/5 px-2 py-1 rounded border border-white/5">
                                        {student}
                                    </span>
                                ))}
                                {students.length > 5 && (
                                    <span className="text-xs text-slate-500 px-2 py-1">+{students.length - 5} more</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {sortedGroups.length === 0 && (
                    <div className="col-span-full text-center p-10 text-slate-500">
                        No analytics available yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessReports;
