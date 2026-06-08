import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import AdminSidebar from "./AdminComponents/AdminSidebar"
import AdminNavbar from "./AdminComponents/AdminNavbar"

const AdminLayout = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setShowSidebar(false)
    }, [location.pathname])

    return (
        <div className="h-screen overflow-hidden bg-[url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center bg-fixed relative">

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-slate-900/90 z-0"></div>

            <div className="relative z-10 font-sans text-slate-200 h-full flex flex-col">

                <AdminNavbar toggleSidebar={() => setShowSidebar(!showSidebar)} />

                <div className="flex pt-16 h-full overflow-hidden">

                    {/* Sidebar - Fixed on desktop, toggleable on mobile */}
                    <div className={`
            fixed md:relative z-40 top-16 md:top-0 h-[calc(100vh-4rem)] md:h-full
            ${showSidebar ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
            border-r border-white/10 bg-slate-900/50 backdrop-blur-md
            w-64 transition-transform duration-300 ease-in-out show
            shrink-0
          `}>
                        <div className="h-full overflow-y-auto overflow-x-hidden no-scrollbar">
                            <AdminSidebar />
                        </div>
                    </div>

                    {/* OVERLAY FOR MOBILE SIDEBAR */}
                    {showSidebar && (
                        <div
                            className="fixed inset-0 z-30 bg-black/50 md:hidden"
                            onClick={() => setShowSidebar(false)}
                        />
                    )}

                    {/* Main Content Area */}
                    <div className="flex-1 p-6 md:p-10 transition-all duration-300 overflow-y-auto overflow-x-hidden no-scrollbar">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminLayout
