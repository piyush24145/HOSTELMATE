import { useState, useEffect } from "react";
import { Menu, User, LogOut, X, Mail, Shield, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Topbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState({ name: "Student", email: "student@hostelmate.com" });

  useEffect(() => {
    if (!showModal) return;

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setProfile({ name: res.data.name, email: res.data.email });
        localStorage.setItem("studentName", res.data.name);
        localStorage.setItem("studentEmail", res.data.email);
      } catch (err) {
        console.error("Error fetching profile in Topbar:", err);
        // Fallback to localStorage
        const storedName = localStorage.getItem("studentName") || "Student Resident";
        const storedEmail = localStorage.getItem("studentEmail") || "student@hostelmate.com";
        setProfile({ name: storedName, email: storedEmail });
      }
    };

    fetchProfile();
  }, [showModal]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentEmail");
    navigate("/student/login");
  };

  return (
    <>
      <div className="
        fixed top-0 left-0 right-0
        h-16 bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-white/10
        flex items-center justify-between
        px-6 md:px-10 z-50
      ">
        {/* Background accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>

        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* MOBILE TOGGLE */}
          <button
            onClick={toggleSidebar}
            className="p-2 -ml-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white md:hidden transition-all"
          >
            <Menu size={24} />
          </button>

          <div className="flex flex-col">
            <h2 className="font-bold text-lg text-white tracking-wide">
              Student <span className="text-blue-400 font-light">Dashboard</span>
            </h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider hidden sm:block">
              Hostel Management Portal
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-white/5 transition-all text-gray-300 hover:text-white group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all duration-300">
              <User size={16} className="text-white" />
            </div>
            <span className="text-sm font-medium hidden md:block">My Profile</span>
          </button>

          <div className="h-8 w-px bg-white/10 hidden md:block"></div> {/* Divider */}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-rose-400 hover:text-rose-300 transition-colors text-sm font-medium hover:bg-rose-500/10 px-3 py-1.5 rounded-lg"
          >
            <LogOut size={18} />
            <span className="hidden md:block">Sign Out</span>
          </button>
        </div>
      </div>

      {/* PROFILE MODAL OVERLAY */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-slate-900 border border-white/10 rounded-3xl w-full max-w-sm p-6 overflow-hidden shadow-2xl transition-all scale-100 flex flex-col items-center">
            
            {/* Top Close Button */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Glowing Avatar */}
            <div className="relative mt-4 mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 p-1 shadow-lg shadow-blue-500/20">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <User size={48} className="text-blue-400" />
                </div>
              </div>
              <div className="absolute bottom-1.5 right-1.5 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full"></div>
            </div>

            {/* User Info */}
            <h3 className="text-2xl font-bold text-white mb-1 tracking-tight text-center">{profile.name}</h3>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6 flex items-center gap-1.5 border border-blue-500/20">
              <Shield size={12} />
              Hostel Resident
            </span>

            {/* Details Cards */}
            <div className="w-full space-y-3 pt-4 border-t border-white/5">
              <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                <Mail size={16} className="text-slate-400 shrink-0" />
                <div className="truncate">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold">Email Address</span>
                  <span className="text-sm font-semibold text-slate-200 truncate">{profile.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                <Calendar size={16} className="text-slate-400 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold">Session Date</span>
                  <span className="text-sm font-semibold text-slate-200">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/5 hover:border-white/10 active:scale-95 transition-all text-sm"
            >
              Done
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
