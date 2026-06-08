import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const RoleCard = ({ title, icon: Icon, loginPath, registerPath, description }) => {
  return (
    <div className="group bg-slate-950/40 backdrop-blur-md rounded-3xl shadow-xl p-8 w-full sm:w-80 text-center border border-white/5 hover:border-blue-500/20 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] flex flex-col justify-between h-[390px]">

      <div>
        {/* ICON CONTAINER */}
        <div className="relative mb-6 mx-auto w-20 h-20 flex items-center justify-center bg-white/[0.03] border border-white/5 rounded-2xl group-hover:scale-110 group-hover:bg-blue-600/10 group-hover:border-blue-500/20 transition-all duration-300">
          <Icon className="w-10 h-10 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
          <div className="absolute inset-0 bg-blue-400/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <h3 className="text-2xl font-bold mb-3 text-white tracking-wide group-hover:text-blue-100 transition-colors">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed px-2">{description}</p>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <Link
          to={loginPath}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition-all duration-300 text-sm flex items-center justify-center gap-1.5"
        >
          <span>Login</span>
          <ArrowRight size={16} />
        </Link>

        <Link
          to={registerPath}
          className="bg-white/[0.03] hover:bg-white/[0.08] text-white font-semibold py-3 px-6 rounded-xl border border-white/5 hover:border-white/10 active:scale-95 transition-all duration-300 text-sm"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default RoleCard;

