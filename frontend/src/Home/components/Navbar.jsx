import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, Building2, Sparkles } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = location.pathname === "/";
  const showTransparent = isHomePage && !isScrolled;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      showTransparent 
        ? "bg-slate-950/20 backdrop-blur-sm border-b border-white/5 py-5" 
        : "bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl py-3"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo / Project Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center p-2.5 rounded-xl bg-gradient-to-tr from-blue-600/10 to-cyan-400/10 border border-blue-500/20 shadow-lg group-hover:scale-105 group-hover:border-cyan-400/30 transition-all duration-300">
              <Building2 className="w-6 h-6 text-blue-400 group-hover:text-cyan-300 transition-colors duration-300" />
              <Sparkles className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 text-cyan-300 animate-pulse" />
            </div>
            <span className="text-2xl font-black text-white tracking-wider group-hover:text-blue-100 transition-colors">
              Hostel<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-light">Mate</span>
            </span>
          </Link>

          {/* Navigation Links for Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-semibold text-sm tracking-wide uppercase transition-colors duration-200 ${isActive("/") ? "text-blue-400" : "text-gray-300 hover:text-white"
                }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`font-semibold text-sm tracking-wide uppercase transition-colors duration-200 ${isActive("/about") ? "text-blue-400" : "text-gray-300 hover:text-white"
                }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className="ml-4 flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white rounded-full font-bold text-sm shadow-md hover:shadow-cyan-500/20 hover:brightness-110 active:scale-95 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              Contact Us
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-white/5 backdrop-blur-2xl transition-all duration-300">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl font-semibold text-base transition-colors ${isActive("/")
                  ? "bg-blue-500/10 text-blue-400 border-l-4 border-blue-500"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl font-semibold text-base transition-colors ${isActive("/about")
                  ? "bg-blue-500/10 text-blue-400 border-l-4 border-blue-500"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-base shadow-lg hover:brightness-110 transition-all"
            >
              <span>Contact Us</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;