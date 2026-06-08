import { useNavigate } from "react-router-dom"

const DashboardCard = ({
  title,
  desc,
  btnText,
  secondaryBtn,
  secondaryLink, // 👈 New prop for secondary action link
  icon: Icon,    // 👈 New prop for Lucide Icon (renamed to Icon for usage)
  image,         // Keep for backward compatibility if needed, but we prefer Icon
  primaryColor = "bg-gradient-to-r from-blue-600 to-cyan-500",
  link,
  children,
}) => {
  const navigate = useNavigate()

  return (
    <div className="
      group relative
      bg-white/90 backdrop-blur-sm
      rounded-2xl
      shadow-md hover:shadow-xl
      transition-all duration-300
      border border-white/50
      overflow-hidden
      hover:-translate-y-1
      flex flex-col h-full
    ">
      {/* Top Accent Line */}
      <div className={`h-1 w-full ${primaryColor} opacity-80`}></div>

      <div className="p-6 flex flex-col h-full z-10">

        <div className="flex justify-between items-start mb-4">
          {/* Render Lucide Icon if provided */}
          {Icon && (
            <div className="p-3 bg-blue-50 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300 text-blue-600">
              <Icon size={24} />
            </div>
          )}

          {/* Fallback to Image if no Icon provided */}
          {!Icon && image && (
            <div className="p-3 bg-blue-50 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
              <img
                src={image}
                alt={title}
                className="w-10 h-10 object-contain"
              />
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold mb-2 text-slate-800">
          {title}
        </h3>

        {/* If children provided (Live Widget), show that. Else show static desc */}
        <div className="flex-grow">
          {children ? (
            <div className="mb-6">{children}</div>
          ) : (
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">{desc}</p>
          )}
        </div>

        <div className="flex gap-3 mt-auto w-full pt-4 border-t border-gray-100/50">
          <button
            onClick={() => link && navigate(link)}
            className={`flex-1 px-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-md ${primaryColor} hover:shadow-lg hover:brightness-110 active:scale-95 transition-all duration-300`}
          >
            {btnText}
          </button>

          {secondaryBtn && (
            <button
              onClick={() => secondaryLink && navigate(secondaryLink)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
            >
              {secondaryBtn}
            </button>
          )}
        </div>
      </div>

      {/* Decorative large faint text/icon background could go here if needed, keeping it simple for now */}
    </div>
  )
}

export default DashboardCard