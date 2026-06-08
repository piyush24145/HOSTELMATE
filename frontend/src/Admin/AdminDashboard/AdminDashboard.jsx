import { useState } from "react"
import AdminDashboardCard from "./AdminComponents/AdminDashboardCard"
import { ClipboardList, FileBarChart } from "lucide-react"
import AdminLayout from "./AdminLayout"

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
        Admin <span className="text-purple-400">Dashboard</span>
      </h1>

      <p className="text-slate-400 mb-10 text-lg">
        Overview of hostel operations and reports.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        <AdminDashboardCard
          title="Manage Complaints"
          desc="View, assign and resolve student complaints."
          btnText="Review Complaints"
          link="/admin/Allcomplaints"
          icon={<ClipboardList size={32} className="text-purple-400" />}
        />

        <AdminDashboardCard
          title="Reports"
          desc="Generate system & complaint reports."
          btnText="View Reports"
          link="/admin/reports"
          icon={<FileBarChart size={32} className="text-pink-400" />}
        />

      </div>
    </AdminLayout>
  )
}

export default AdminDashboard