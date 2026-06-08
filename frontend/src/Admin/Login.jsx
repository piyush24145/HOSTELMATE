import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await axios.post(
       `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );

      const { token, role } = res.data;

      if (role !== "admin") {
        setError("You are not authorized as Admin");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Fetch profile details
      try {
        const profileRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        localStorage.setItem("adminName", profileRes.data.name);
        localStorage.setItem("adminEmail", profileRes.data.email);
      } catch (profileErr) {
        console.error("Could not load admin profile:", profileErr);
        localStorage.setItem("adminName", "Admin User");
        localStorage.setItem("adminEmail", email);
      }

      navigate("/admin/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat relative px-4 overflow-hidden">

      {/* Dark Overlay with slightly different gradient for Admin */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-purple-900/80 backdrop-blur-[2px] z-0"></div>

      {/* Glass Form Container */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Admin Portal</h2>
          <p className="text-gray-300 text-sm">Manage Hostel Operations</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 text-sm p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-xs uppercase font-bold mb-2 ml-1">Admin Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              placeholder="admin@hostel.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-xs uppercase font-bold mb-2 ml-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Authenticating..." : "Admin Access"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Not an admin?{" "}
            <button type="button" onClick={() => navigate("/admin/register")} className="text-purple-400 hover:text-purple-300 font-semibold hover:underline">
              Register New Admin
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;
