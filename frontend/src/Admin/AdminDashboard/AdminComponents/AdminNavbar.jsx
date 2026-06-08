import { Menu, LogOut, User } from "lucide-react"
import { useNavigate } from "react-router-dom"

const AdminNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/admin/login")
  }

  return (
    <div className="
      fixed top-0 left-0 right-0
      h-16 bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-white/10
      flex items-center justify-between
      px-6 md:px-10 z-50
    ">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-white/10 text-white md:hidden transition-colors"
        >
          <Menu size={24} />
        </button>

        <h2 className="font-bold text-lg md:text-xl text-white tracking-tight">
          Hostel<span className="text-purple-400">Mate</span> <span className="text-xs text-slate-400 font-normal uppercase tracking-widest ml-2 hidden sm:inline-block">Admin Panel</span>
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm font-medium">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
            <User size={16} />
          </div>
          <span className="hidden md:block">Profile</span>
        </button>

        <div className="h-6 w-px bg-white/10"></div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-rose-400 hover:text-rose-300 transition-colors text-sm font-medium hover:bg-rose-500/10 px-3 py-1.5 rounded-lg"
        >
          <LogOut size={18} />
          <span className="hidden md:block">Sign Out</span>
        </button>
      </div>
    </div>
  )
}

export default AdminNavbar