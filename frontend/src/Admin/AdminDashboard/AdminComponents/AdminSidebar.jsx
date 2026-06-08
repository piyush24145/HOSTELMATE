import { NavLink } from "react-router-dom"
import { LayoutDashboard, ClipboardList, FileBarChart, UserCircle, UtensilsCrossed } from "lucide-react"

const AdminSidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium my-1
     ${isActive
      ? "bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-lg shadow-purple-500/30 translate-x-1"
      : "text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1"
    }`

  return (
    <div className="
      w-full
      bg-slate-900/95 backdrop-blur-md
      text-white
      h-full
      min-h-screen
      flex flex-col
      border-r border-white/10
      relative
      overflow-hidden
    ">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none"></div>

      {/* PROFILE */}
      <div className="p-6 relative z-10">
        <div className="flex items-center gap-4 mb-8 p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-lg">
              <UserCircle size={28} />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm leading-tight">
              Admin User
            </h3>
            <p className="text-xs text-purple-400 font-medium">Administrator</p>
          </div>
        </div>

        {/* MENU */}
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-4">Menu</p>

          <NavLink to="/admin/dashboard" className={linkClass}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink to="/admin/Allcomplaints" className={linkClass}>
            <ClipboardList size={20} />
            Complaints
          </NavLink>

          <NavLink to="/admin/Leaves" className={linkClass}>
            <FileBarChart size={20} />
            Leave Requests
          </NavLink>

          <NavLink to="/admin/reports" className={linkClass}>
            <FileBarChart size={20} />
            Reports
          </NavLink>
          <NavLink to="/admin/createmenu" className={linkClass}>
            <UtensilsCrossed size={20} />
            Mess Menu
          </NavLink>
          <NavLink to="/admin/messAnalytics" className={linkClass}>
            <FileBarChart size={20} />
            Mess Analytics
          </NavLink>
          {/* <NavLink to="/admin/mess-complaints" className={linkClass}>
            <UtensilsCrossed size={20} />
            Mess Complaints
          </NavLink> */}
          <NavLink to="/admin/mess-issues" className={linkClass}>
            <UtensilsCrossed size={20} />
            Review Mess Issues
          </NavLink>

          <NavLink to="/admin/mess-reports" className={linkClass}>
            <FileBarChart size={20} />
            Mess Reports
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar
