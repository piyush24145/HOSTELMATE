import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"

const AdminDashboardCard = ({
  title,
  desc,
  btnText,
  link,
  icon
}) => {
  const navigate = useNavigate()

  return (
    <div className="
      bg-white/10 backdrop-blur-md
      p-8 rounded-3xl
      shadow-xl border border-white/10
      hover:bg-white/15 hover:scale-[1.02] hover:shadow-2xl hover:border-white/20
      transition-all duration-300
      flex flex-col
      group
    ">

      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
          {title}
        </h3>
        {icon && (
          <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors">
            {icon}
          </div>
        )}
      </div>

      <p className="text-slate-400 mb-8 leading-relaxed">
        {desc}
      </p>

      <button
        onClick={() => navigate(link)}
        className="
          mt-auto
          w-full
          bg-gradient-to-r from-blue-600 to-purple-600
          text-white font-bold py-3.5 rounded-xl
          shadow-lg shadow-purple-500/20
          hover:shadow-purple-500/40 hover:brightness-110 active:scale-95
          transition-all duration-300
          flex items-center justify-center gap-2
        "
      >
        {btnText} <ArrowRight size={18} />
      </button>
    </div>
  )
}

export default AdminDashboardCard