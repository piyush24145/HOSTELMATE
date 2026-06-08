import { 
  Target, 
  Eye, 
  Users, 
  ShieldCheck, 
  Zap, 
  Award,
  Globe
} from "lucide-react";

const About = () => {
  const stats = [
    { value: "100%", label: "Paperless Requests" },
    { value: "24/7", label: "Instant Access" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "5x", label: "Faster Approvals" }
  ];

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To modernize student accommodation by replacing manual, slow workflows with unified, fast, and transparent digital tools."
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "To build a smart-campus ecosystem where residents and administrators enjoy seamless, real-time collaboration."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Bridging the communication gap by ensuring every student's feedback regarding facilities and food menu is heard."
    }
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: "Secure Verification",
      description: "All accounts are secured with JWT and role authorization, keeping personal details and gate passes strictly confidential."
    },
    {
      icon: Zap,
      title: "Real-time Operations",
      description: "From lodging a maintenance complaint to reviewing mess analytics, requests update instantly in the database."
    },
    {
      icon: Award,
      title: "Premium Design",
      description: "Featuring high-fidelity responsive layouts, responsive sidebar dashboards, and automated digital signing."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative selection:bg-blue-500 selection:text-white">
      
      {/* Background Animated Gradient Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse duration-10000"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px] animate-pulse duration-7000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16 md:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-blue-400 mb-2">
            <Globe size={14} className="animate-spin duration-3000" />
            <span>Modernizing Hostel Operations</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">HostelMate</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            HostelMate is a modern campus residency management system built to digitize residential workflows, including real-time issue tracking, automated leave gate-passes, and mess rating analytics.
          </p>
        </div>

        {/* CORE STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-28">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-center shadow-lg">
              <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2">{stat.value}</p>
              <p className="text-slate-400 text-xs md:text-sm uppercase tracking-wider font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* MISSION & VISION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-28">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="bg-slate-950/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 hover:border-blue-500/10 shadow-xl transition-all duration-300">
                <div className="p-3 bg-blue-500/10 rounded-xl w-fit text-blue-400 mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{val.description}</p>
              </div>
            );
          })}
        </div>

        {/* FEATURES GRID */}
        <div className="border-t border-white/5 pt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
              Why Choose <span className="text-blue-400">HostelMate?</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base">
              Built on clean logic, secure protocols, and rich UI animations to offer students and wardens the best experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/10 hover:bg-white/[0.04] transition-all duration-300 group">
                  <div className="p-3 bg-cyan-500/10 rounded-xl w-fit text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-slate-950 text-slate-500 text-center py-8 text-xs relative z-10">
        <p>© 2026 HostelMate Management System. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default About;
