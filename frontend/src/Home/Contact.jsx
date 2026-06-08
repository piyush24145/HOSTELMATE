import { useState } from "react";
import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSuccess(false), 5000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative selection:bg-blue-500 selection:text-white">
      
      {/* Background Animated Gradient Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse duration-10000"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px] animate-pulse duration-7000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16 md:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-blue-400 mb-2">
            <Sparkles size={14} />
            <span>24/7 Dedicated Assistance</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">Our Team</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Have questions about registrations, leaves, or system permissions? Reach out to us, and the administrative warden team will get back to you shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          
          {/* CONTACT INFO (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-xl space-y-8">
              
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Connect With Us</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Feel free to visit the administration office or contact us through the details below.</p>
              </div>

              <div className="space-y-6">
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Email Support</p>
                    <p className="text-white text-sm font-semibold">support@hostelmate.com</p>
                    <p className="text-slate-500 text-xs mt-0.5">Average response time: 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Call Helpline</p>
                    <p className="text-white text-sm font-semibold">+91 (800) 123-4567</p>
                    <p className="text-slate-500 text-xs mt-0.5">Available Mon-Fri, 9am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Office Location</p>
                    <p className="text-white text-sm font-semibold">IIT Campus, Block C-3, New Delhi, India</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* CONTACT FORM (7 Columns) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-slate-950/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-xl space-y-6">
              
              <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
              
              {success && (
                <div className="p-4 bg-green-500/10 border border-green-500/35 rounded-xl text-green-300 text-sm font-medium text-center">
                  Message Sent Successfully! We will respond shortly. ✅
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-300 text-xs uppercase tracking-wider font-bold mb-2 ml-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-xs uppercase tracking-wider font-bold mb-2 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-xs uppercase tracking-wider font-bold mb-2 ml-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs uppercase tracking-wider font-bold mb-2 ml-1">Message Content</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all h-32 resize-none text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send size={16} />
                <span>{loading ? "Sending Message..." : "Send Message"}</span>
              </button>

            </form>
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

export default Contact;
