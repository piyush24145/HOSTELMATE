import { useEffect, useState } from "react"
import axios from "axios"
import { Search, Filter, CheckCircle, Clock, AlertCircle, User, MapPin, Tag, MoreVertical, ImageIcon, ChevronDown } from "lucide-react"

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")

  // ================= FETCH COMPLAINTS =================
  const fetchComplaints = async () => {
    const token = localStorage.getItem("token")
    setLoading(true)

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/complaints/admin/complaints`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setComplaints(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComplaints()
  }, [])

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token")

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/complaints/status/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      fetchComplaints() // refresh after update
    } catch (err) {
      console.log(err)
    }
  }

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch =
      c.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.room?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.type?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "All" || c.status === filterStatus;

    return matchesSearch && matchesStatus;
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "In Progress": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Assigned": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  }

  return (
    <div className="min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Complaint Management
            <span className="text-xs font-normal text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded-full">{complaints.length} Total</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1 ml-1">Monitor and resolve student issues</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4">

          <div className="relative group">
            <Search className="absolute left-3 top-2.5 text-slate-400 group-hover:text-purple-400 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-full sm:w-64 backdrop-blur-sm transition-all shadow-lg hover:bg-slate-800/80"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative group">
            <Filter className="absolute left-3 top-2.5 text-slate-400 group-hover:text-purple-400 transition-colors" size={18} />
            <select
              className="pl-10 pr-8 py-2.5 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none backdrop-blur-sm cursor-pointer w-full sm:w-48 transition-all shadow-lg hover:bg-slate-800/80"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Created">Created</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none group-hover:text-purple-400 transition-colors" size={14} />
          </div>

        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4 shadow-lg shadow-purple-500/20"></div>
          Loading complaints...
        </div>
      ) : (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/5">

          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-5 bg-gradient-to-r from-slate-900/40 to-slate-800/40 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-white/5">
            <div className="col-span-3 pl-2">Student & Room</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-4">Description</div>
            <div className="col-span-1">Date</div>
            <div className="col-span-2 text-right pr-2">Status</div>
          </div>

          <div className="divide-y divide-white/5">
            {filteredComplaints.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                <div className="p-4 bg-white/5 rounded-full mb-3">
                  <AlertCircle className="opacity-50" size={32} />
                </div>
                No complaints found matching your criteria.
              </div>
            )}

            {filteredComplaints.map((c) => (
              <div key={c._id} className="flex flex-col md:grid md:grid-cols-12 gap-4 p-5 items-start md:items-center hover:bg-white/5 transition-all duration-300 md:hover:scale-[1.005] group border-l-2 border-transparent hover:border-purple-500">

                {/* User Info */}
                <div className="col-span-3 flex items-center gap-4 w-full pl-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-purple-300 font-bold border border-white/10 shrink-0 shadow-lg shadow-purple-500/10 group-hover:shadow-purple-500/20 transition-all">
                    {c.user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm group-hover:text-purple-300 transition-colors">{c.user?.name || "Unknown"}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                      <MapPin size={10} className="text-purple-400/70" /> {c.room}
                    </div>
                  </div>
                </div>

                {/* Type */}
                <div className="col-span-2 w-full">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-slate-300 group-hover:bg-white/10 transition-colors">
                    <Tag size={12} className="text-purple-400" />
                    {c.type}
                  </span>
                </div>

                {/* Description */}
                <div className="col-span-4 relative group/desc w-full">
                  <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">{c.description}</p>
                  {c.image && (
                    <div className="mt-3 md:mt-0 md:absolute md:top-1/2 md:-translate-y-1/2 md:right-0 md:opacity-0 md:group-hover/desc:opacity-100 md:translate-x-2 md:group-hover/desc:translate-x-0 transition-all duration-300 z-10 pointer-events-none group-hover/desc:pointer-events-auto">
                      <a href={`http://localhost:5000/uploads/${c.image}`} target="_blank" rel="noreferrer" className="block w-20 h-20 md:w-32 md:h-32 rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl bg-slate-900 group-hover/desc:scale-105 transition-transform">
                        <img src={`http://localhost:5000/uploads/${c.image}`} className="w-full h-full object-cover" alt="Proof" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-[10px] text-white font-bold uppercase tracking-wider">View</span>
                        </div>
                      </a>
                    </div>
                  )}
                  {c.image && <span className="text-[10px] text-blue-400 flex items-center gap-1 mt-2 md:hidden"><ImageIcon size={10} /> Attachment available</span>}
                  {c.image && <span className="hidden md:flex text-[10px] text-slate-500 items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"><ImageIcon size={10} className="text-blue-400" /> Hover description</span>}
                </div>

                {/* Date */}
                <div className="col-span-1 text-xs text-slate-400 flex items-center gap-1.5 w-full">
                  <Clock size={12} className="text-purple-400/50" />
                  {new Date(c.createdAt).toLocaleDateString()}
                </div>

                {/* Status & Actions */}
                <div className="col-span-2 flex justify-start md:justify-end w-full pr-2">
                  <div className="relative group/select">
                    <select
                      className={`text-xs font-bold px-4 py-2 pr-9 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500/20 appearance-none cursor-pointer transition-all shadow-sm ${getStatusColor(c.status)}`}
                      value={c.status}
                      onChange={(e) => updateStatus(c._id, e.target.value)}
                    >
                      <option className="bg-slate-800 text-slate-300" value="Created">Created</option>
                      <option className="bg-slate-800 text-yellow-300" value="Assigned">Assigned</option>
                      <option className="bg-slate-800 text-blue-300" value="In Progress">In Progress</option>
                      <option className="bg-slate-800 text-green-300" value="Resolved">Resolved</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 pointer-events-none opacity-50 group-hover/select:translate-y-0.5 transition-transform" size={12} />
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  )
}

export default AllComplaints
