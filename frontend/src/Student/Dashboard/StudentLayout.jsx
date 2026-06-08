import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Studentcomponents/Sidebar";
import Topbar from "./Studentcomponents/Topbar";

const StudentLayout = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [studentName, setStudentName] = useState("Student");
    const location = useLocation();

    useEffect(() => {
        setShowSidebar(false);
    }, [location.pathname]);

    useEffect(() => {
        // fast retrieval for layout
        const storedName = localStorage.getItem("studentName");
        if (storedName) setStudentName(storedName);
    }, []);

    return (
        <div className="h-screen overflow-hidden bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-fixed relative">

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-slate-900/90 z-0"></div>

            {/* Content wrapper */}
            <div className="relative z-10 flex flex-col h-full">

                {/* TOPBAR */}
                <Topbar toggleSidebar={() => setShowSidebar(!showSidebar)} />

                <div className="flex pt-16 h-full overflow-hidden">

                    {/* SIDEBAR */}
                    <div
                        className={`
            fixed md:relative z-40 top-16 md:top-0 h-[calc(100vh-4rem)] md:h-full
            ${showSidebar ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
            border-r border-white/10 bg-slate-900/50 backdrop-blur-md
            w-64 transition-transform duration-300 ease-in-out
            shrink-0
          `}
                    >
                        <div className="h-full overflow-y-auto overflow-x-hidden no-scrollbar">
                            <Sidebar studentName={studentName} />
                        </div>
                    </div>

                    {/* OVERLAY FOR MOBILE SIDEBAR */}
                    {showSidebar && (
                        <div
                            className="fixed inset-0 z-30 bg-black/50 md:hidden"
                            onClick={() => setShowSidebar(false)}
                        />
                    )}

                    {/* MAIN CONTENT AREA */}
                    <main className="flex-1 p-6 md:p-10 transition-all duration-300 overflow-y-auto overflow-x-hidden no-scrollbar">
                        <div className="max-w-7xl mx-auto h-full">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default StudentLayout;
