
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

     const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/auth/login`,
  { email, password }
);

      const { token, role } = res.data;

      if (role !== "student") {
        setError("You are not authorized as Student");
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
        localStorage.setItem("studentName", profileRes.data.name);
        localStorage.setItem("studentEmail", profileRes.data.email);
      } catch (profileErr) {
        console.error("Could not load user profile:", profileErr);
        localStorage.setItem("studentName", "Student User");
        localStorage.setItem("studentEmail", email);
      }

      navigate("/student/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Fixed height to prevent scrolling, adjusted for navbar if needed (h-[calc(100vh-5rem)])
    <div className="h-[calc(100vh-5rem)] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat relative px-4 overflow-hidden">

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-blue-900/80 backdrop-blur-[2px] z-0"></div>

      {/* Glass Form Container */}
      <form onSubmit={handleLogin} className="relative z-10 bg-white/10 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Student Login</h2>
          <p className="text-gray-300 text-sm">Welcome back to HostelMate</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 text-sm p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 text-xs uppercase font-bold mb-2 ml-1">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-xs uppercase font-bold mb-2 ml-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : "Access Dashboard"}
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{" "}
            <button type="button" onClick={() => navigate("/student/register")} className="text-blue-400 hover:text-blue-300 font-semibold hover:underline">
              Register here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default StudentLogin;
