import {
  Home,
  PenLine,
  ClipboardList,
  FilePlus,
  FileText,
  LogOut,
  UserCircle,
  UtensilsCrossed
} from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"

const Sidebar = ({ studentName = "Student" }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/student/login")
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium my-1
     ${isActive
      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 translate-x-1"
      : "text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1"
    }`

  return (
    <div
      className="
        w-full
        bg-slate-900/95 backrop-blur-md
        text-white
        h-full
        min-h-screen /* ensure full height */
        flex flex-col /* removed justify-between */
        border-r border-white/10
        relative
        overflow-hidden
      "
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none"></div>



      {/* PROFILE */}
      <div className="p-6 relative z-10">
        <div className="flex items-center gap-4 mb-8 p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
              <UserCircle size={28} />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm leading-tight">
              {studentName}
            </h3>
            <p className="text-xs text-blue-400 font-medium">Student Account</p>
          </div>
        </div>

        {/* MENU */}
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-4">Menu</p>

          <NavLink to="/student/dashboard" className={linkClass}>
            <Home size={20} />
            Dashboard
          </NavLink>

          <NavLink to="/student/raise-complaint" className={linkClass}>
            <PenLine size={20} />
            Raise Complaint
          </NavLink>

          <NavLink to="/student/my-complaints" className={linkClass}>
            <ClipboardList size={20} />
            My Complaints
          </NavLink>

          <NavLink to="/student/Leaves" className={linkClass}>
            <FilePlus size={20} />
            Apply Leave
          </NavLink>

          <NavLink to="/student/myleave" className={linkClass}>
            <FileText size={20} />
            My Leaves
          </NavLink>

          <NavLink to="/student/messpage" className={linkClass}>
            <UtensilsCrossed size={20} />
            Mess Menu
          </NavLink>

          <NavLink to="/student/raise-mess-issue" className={linkClass}>
            <PenLine size={20} />
            Raise Mess Issue
          </NavLink>

          <NavLink to="/student/my-mess-issues" className={linkClass}>
            <ClipboardList size={20} />
            My Mess Issues
          </NavLink>
        </div>
      </div>



    </div>
  )
}

export default Sidebar
