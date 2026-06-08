import { useState } from "react";
import { AlertCircle, Utensils, CalendarDays } from "lucide-react";
import Sidebar from "./Studentcomponents/Sidebar";
import DashboardCard from "./Studentcomponents/DashboardCard";
import Topbar from "./Studentcomponents/Topbar";
import useDashboardData from "../../hooks/useDashboardData";

const StudentDashboard = () => {
  const { todaysMess, leaveStatus, loading } = useDashboardData();

  return (
    <>
      {/* HEADER SECTION */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl mb-4">
          Student <span className="text-blue-400">Dashboard</span>
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl">
          Welcome back! Manage your hostel life, track complaints, and check mess updates in real-time.
        </p>
      </div>

      {/* DASHBOARD GRID (LIVE WIDGETS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card 1: Complaints Widget */}
        <div className="transform hover:-translate-y-1 transition-transform duration-300">
          <DashboardCard
            title="Complaints"
            btnText="Lodge Complaint"
            link="/student/raise-complaint"
            icon={AlertCircle}
            secondaryBtn="View All"
            secondaryLink="/student/my-complaints"
            primaryColor="bg-blue-600 hover:bg-blue-700"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-blue-50 rounded-full text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                </span>
                <div>
                  <span className="text-sm font-bold text-slate-700 block">Report Issues</span>
                  <span className="text-xs text-slate-500">We are here to help you</span>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>

        {/* Card 2: Mess Menu Widget */}
        <div className="transform hover:-translate-y-1 transition-transform duration-300">
          <DashboardCard
            title="Today's Meal"
            btnText="Full Menu"
            link="/student/messpage"
            icon={Utensils}
            primaryColor="bg-gradient-to-r from-orange-500 to-amber-500"
          >
            <div className="flex flex-col gap-3">
              {loading ? (
                <span className="text-sm text-slate-400">Loading menu...</span>
              ) : todaysMess ? (
                <>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-green-100/80 text-green-800 text-[10px] font-bold uppercase rounded tracking-wider">Lunch</span>
                    <span className="text-sm font-medium text-slate-800 truncate border-b border-dashed border-slate-300 pb-0.5">{todaysMess.lunch?.join(", ") || "Not updated"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-indigo-100/80 text-indigo-800 text-[10px] font-bold uppercase rounded tracking-wider">Dinner</span>
                    <span className="text-sm font-medium text-slate-800 truncate border-b border-dashed border-slate-300 pb-0.5">{todaysMess.dinner?.join(", ") || "Not updated"}</span>
                  </div>
                </>
              ) : (
                <span className="text-sm text-slate-500 italic">Menu not updated today</span>
              )}
            </div>
          </DashboardCard>
        </div>

        {/* Card 3: Leave Status Widget */}
        <div className="transform hover:-translate-y-1 transition-transform duration-300">
          <DashboardCard
            title="Leave Status"
            btnText="Apply Leave"
            link="/student/Leaves"
            icon={CalendarDays}
            primaryColor="bg-gradient-to-r from-purple-600 to-pink-500"
          >
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-xl text-sm font-bold shadow-sm ${leaveStatus === "Approved" ? "bg-green-100 text-green-700" :
                leaveStatus === "Pending" ? "bg-yellow-100 text-yellow-700" :
                  leaveStatus === "Rejected" ? "bg-red-100 text-red-700" :
                    "bg-gray-100 text-gray-600"
                }`}>
                {leaveStatus}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-600">Latest Request</span>
                <span className="text-xs text-slate-400">Check details</span>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;