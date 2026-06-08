import { useState } from "react";
import { 
  GraduationCap, 
  ShieldCheck, 
  MessageSquare, 
  CalendarRange, 
  TrendingUp, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Sparkles
} from "lucide-react";
import RoleCard from "./components/RoleCard";

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I raise a complaint?",
      answer: "Login to your Student Portal, go to 'Raise Complaint', fill in the details, and submit. You can track the real-time resolution progress on the 'My Complaints' timeline."
    },
    {
      question: "Can I view the mess menu in advance?",
      answer: "Yes, the Student Mess Menu dashboard fetches the latest menu published by the Admin. You can also submit ratings and reviews directly from the portal."
    },
    {
      question: "How are leave requests approved?",
      answer: "Once you submit a leave application, your hostel admin receives it on their dashboard. Upon approval, a digitally signed PDF leave pass is automatically generated for you."
    },
    {
      question: "Is there a role authorization system?",
      answer: "Yes, student and admin accounts are strictly segregated. You can only log into your authorized portal using JWT-verified secure authentication."
    }
  ];

  const features = [
    {
      icon: MessageSquare,
      title: "Complaints Portal",
      description: "Lodging room maintenance or general issues with real-time progress timelines."
    },
    {
      icon: CalendarRange,
      title: "Mess Schedules",
      description: "Daily breakfast, lunch, and dinner menus with integrated student feedback systems."
    },
    {
      icon: GraduationCap,
      title: "Leave Management",
      description: "Fast leave pass requests and automatic generation of signed gate-pass PDFs."
    },
    {
      icon: TrendingUp,
      title: "Warden Analytics",
      description: "Visual complaints reporting and mess feedback analytics for administrative planning."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative selection:bg-blue-500 selection:text-white">
      
      {/* Background Animated Gradient Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse duration-10000"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px] animate-pulse duration-7000"></div>
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* HERO SECTION */}
        <div className="text-center mb-16 md:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-blue-400 mb-2">
            <Sparkles size={14} className="animate-spin duration-3000" />
            <span>Smart Campus Living Solution</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-tight max-w-5xl mx-auto">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">Campus Experience</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Seamlessly manage complaints, leaves, and mess schedules. A unified hub designed to connect hostel residents and administrations effortlessly.
          </p>
        </div>

        {/* ROLE CARDS SECTION */}
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-center mb-28">
          <RoleCard
            title="Student Portal"
            icon={GraduationCap}
            description="Access your dashboard, submit maintenance requests, request leave gate-passes, and check daily menus."
            loginPath="/student/login"
            registerPath="/student/register"
          />

          <RoleCard
            title="Admin Portal"
            icon={ShieldCheck}
            description="Manage rooms, review and approve complaints, sign leaves, configure menus, and track satisfaction analytics."
            loginPath="/admin/login"
            registerPath="/admin/register"
          />
        </div>

        {/* FEATURES GRID SECTION */}
        <div className="border-t border-white/5 pt-20 mb-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
              Everything you need in <span className="text-blue-400">One Place</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base">
              Say goodbye to paperwork. Enjoy automated tools to track issues and approvals instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/10 hover:bg-white/[0.04] transition-all duration-300 group">
                  <div className="p-3 bg-blue-500/10 rounded-xl w-fit text-blue-400 mb-5 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="border-t border-white/5 pt-20 pb-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4 flex items-center justify-center gap-2">
              <HelpCircle className="text-blue-400" />
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Quick answers to common questions about using the HostelMate system.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.03] transition-colors"
                  >
                    <span className="font-bold text-white text-base md:text-lg pr-4">{faq.question}</span>
                    {isOpen ? <ChevronUp className="text-slate-400 shrink-0" /> : <ChevronDown className="text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 border-t border-white/5 bg-slate-950/40">
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* FOOTER SECTION */}
      <footer className="bg-slate-950 border-t border-white/5 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Column 1 - Brand info */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
                  H
                </div>
                <span className="text-xl font-bold text-white tracking-wide">
                  Hostel<span className="text-blue-400 font-light">Mate</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                A premium, modern hostel management web system designed to bridge communications, simplify leaf passes, automate mess menu ratings, and streamline complaint management.
              </p>
              <div className="flex gap-4 pt-2 text-slate-500">
                <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={18} /></a>
                <a href="#" className="hover:text-blue-400 transition-colors"><Github size={18} /></a>
                <a href="#" className="hover:text-blue-400 transition-colors"><Linkedin size={18} /></a>
              </div>
            </div>

            {/* Column 2 - Links */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>

            {/* Column 3 - Contact details */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Get In Touch</h4>
              <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                <Mail size={16} className="text-blue-400" />
                <span>support@hostelmate.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                <Phone size={16} className="text-blue-400" />
                <span>+91 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                <MapPin size={16} className="text-blue-400" />
                <span>IIT Campus, New Delhi, India</span>
              </div>
            </div>

          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
            <p>© 2026 HostelMate Management System. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
