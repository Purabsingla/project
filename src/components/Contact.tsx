// import React, { useState, useRef } from "react";
// import {
//   Send,
//   Github,
//   Linkedin,
//   Mail,
//   Terminal,
//   Cpu,
//   Share2,
//   Signal,
// } from "lucide-react";
// import { motion, useInView } from "framer-motion";
// import emailjs from "@emailjs/browser";

// const Contact: React.FC = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     // Simulate transmission delay
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     setIsSubmitting(false);
//     setFormData({ name: "", email: "", subject: "", message: "" });
//     alert("TRANSMISSION SUCCESSFUL");
//   };

//   const socialLinks = [
//     {
//       icon: Github,
//       label: "GITHUB_UPLINK",
//       href: "https://github.com/Purabsingla",
//       color: "cyan",
//     },
//     {
//       icon: Linkedin,
//       label: "LINKEDIN_FEED",
//       href: "https://linkedin.com/in/purab-singla-081365229/",
//       color: "blue",
//     },
//     {
//       icon: Mail,
//       label: "MAIL_RELAY",
//       href: "mailto:purabsingla15@gmail.com?subject=Hiring Inquiry from Portfolio",
//       color: "purple",
//     },
//   ];

//   return (
//     <section
//       ref={ref}
//       id="contact"
//       className="py-32 relative overflow-hidden bg-[#030014]"
//     >
//       {/* --- BACKGROUND GRID --- */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

//       <div className="max-w-7xl mx-auto px-6 relative z-10">
//         {/* HEADER */}
//         <div className="mb-20">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={isInView ? { opacity: 1, x: 0 } : {}}
//             className="flex items-center gap-2 mb-4"
//           >
//             <Signal className="text-cyan-500 animate-pulse" size={20} />
//             <span className="text-cyan-500 font-mono text-sm tracking-widest uppercase">
//               Signal_Strength: 100%
//             </span>
//           </motion.div>
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.1 }}
//             className="text-4xl md:text-6xl font-bold text-white tracking-tight"
//           >
//             INITIALIZE{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
//               TRANSMISSION
//             </span>
//           </motion.h2>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
//           {/* LEFT COLUMN: CONNECTIVITY INFO */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             animate={isInView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="space-y-12"
//           >
//             <p className="text-slate-400 text-lg leading-relaxed border-l-2 border-cyan-500/30 pl-6">
//               Ready to collaborate on high-performance systems? Establish a
//               secure connection below. Awaiting incoming data packets.
//             </p>

//             {/* Connection Nodes */}
//             <div className="space-y-6">
//               {socialLinks.map((social, idx) => (
//                 <a
//                   key={idx}
//                   href={social.href}
//                   className="group flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 rounded-lg"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div
//                       className={`p-3 bg-${social.color}-500/10 rounded text-${social.color}-400 group-hover:text-white transition-colors`}
//                     >
//                       <social.icon size={24} />
//                     </div>
//                     <div>
//                       <div className="text-xs text-slate-500 font-mono mb-1">
//                         CHANNEL_0{idx + 1}
//                       </div>
//                       <div className="text-white font-bold tracking-wide">
//                         {social.label}
//                       </div>
//                     </div>
//                   </div>
//                   <Share2
//                     size={18}
//                     className="text-slate-600 group-hover:text-cyan-400 transition-colors"
//                   />
//                 </a>
//               ))}
//             </div>

//             {/* System Status Box */}
//             <div className="p-6 bg-black/40 border border-white/5 rounded-xl font-mono text-xs space-y-2 text-green-400/80">
//               <div className="flex justify-between">
//                 <span>&gt; ENCRYPTION_LEVEL</span>
//                 <span>AES-256</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>&gt; PORT_STATUS</span>
//                 <span>OPEN</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>&gt; LATENCY</span>
//                 <span>&lt; 24ms</span>
//               </div>
//             </div>
//           </motion.div>

//           {/* RIGHT COLUMN: TRANSMISSION FORM */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="relative"
//           >
//             {/* Decorative Bracket */}
//             <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-3xl pointer-events-none" />
//             <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-purple-500/30 rounded-bl-3xl pointer-events-none" />

//             <form
//               onSubmit={handleSubmit}
//               className="p-8 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl space-y-6 relative z-10"
//             >
//               <div className="flex items-center gap-2 mb-8 text-slate-500 font-mono text-xs">
//                 <Terminal size={14} />
//                 <span>/usr/bin/send_message</span>
//               </div>

//               {/* Name Input */}
//               <div className="space-y-2 group">
//                 <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider ml-1">
//                   Identify_User
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-700"
//                     placeholder="Enter Name..."
//                     required
//                   />
//                   <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-cyan-500 transition-all duration-300 group-focus-within:w-full" />
//                 </div>
//               </div>

//               {/* Email Input */}
//               <div className="space-y-2 group">
//                 <label className="text-xs font-mono text-purple-400 uppercase tracking-wider ml-1">
//                   Return_Address
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-all placeholder:text-slate-700"
//                     placeholder="user@domain.com"
//                     required
//                   />
//                   <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-purple-500 transition-all duration-300 group-focus-within:w-full" />
//                 </div>
//               </div>

//               {/* Message Input */}
//               <div className="space-y-2 group">
//                 <label className="text-xs font-mono text-slate-400 uppercase tracking-wider ml-1">
//                   Data_Packet
//                 </label>
//                 <div className="relative">
//                   <textarea
//                     name="message"
//                     rows={4}
//                     value={formData.message}
//                     onChange={handleChange}
//                     className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-700 resize-none"
//                     placeholder="Input message data..."
//                     required
//                   />
//                   <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 group-focus-within:w-full" />
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full relative overflow-hidden group bg-cyan-950 hover:bg-cyan-900 text-cyan-400 border border-cyan-800/50 py-4 rounded-lg font-mono font-bold tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <div className="absolute inset-0 w-0 bg-cyan-500/10 transition-all duration-500 ease-out group-hover:w-full" />
//                 <span className="relative flex items-center justify-center gap-2">
//                   {isSubmitting ? (
//                     <>
//                       <Cpu className="animate-spin" size={18} />
//                       <span>PROCESSING_...</span>
//                     </>
//                   ) : (
//                     <>
//                       <Send size={18} />
//                       <span>EXECUTE_TRANSMISSION</span>
//                     </>
//                   )}
//                 </span>
//               </button>
//             </form>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;
import React, { useState, useRef } from "react";
import {
  Send,
  Github,
  Linkedin,
  Mail,
  Terminal,
  Cpu,
  Share2,
  Signal,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser"; // 1. Import EmailJS

const Contact: React.FC = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null); // 2. Create a ref for the form
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setStatus("idle");

    // 3. ACTUAL SENDING LOGIC
    // Replace these placeholders with your actual keys from EmailJS dashboard
    const SERVICE_ID = "service_yp2kgpa";
    const TEMPLATE_ID = "template_fyj5vak";
    const PUBLIC_KEY = "VyJoGF0Hs-e1FGA-M";

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current!,
        PUBLIC_KEY
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Clear form

      // Reset status after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("TRANSMISSION FAILED:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: Github,
      label: "GITHUB_UPLINK",
      href: "https://github.com/Purabsingla",
      color: "cyan",
    },
    {
      icon: Linkedin,
      label: "LINKEDIN_FEED",
      href: "https://linkedin.com/in/purab-singla-081365229/",
      color: "blue",
    },
    {
      icon: Mail,
      label: "MAIL_RELAY",
      href: "mailto:purabsingla15@gmail.com?subject=Hiring Inquiry from Portfolio",
      color: "purple",
    },
  ];

  return (
    <section
      ref={ref}
      id="contact"
      className="py-32 relative overflow-hidden bg-void-black"
    >
      {/* --- BACKGROUND GRID --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="flex items-center gap-2 mb-4"
          >
            <Signal className="text-cyan-500 animate-pulse" size={20} />
            <span className="text-cyan-500 font-mono text-sm tracking-widest uppercase">
              Signal_Strength: 100%
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight"
          >
            INITIALIZE{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-600">
              TRANSMISSION
            </span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <p className="text-slate-400 text-lg leading-relaxed border-l-2 border-cyan-500/30 pl-6">
              Ready to collaborate on high-performance systems? Establish a
              secure connection below. Awaiting incoming data packets.
            </p>

            {/* Connection Nodes */}
            <div className="space-y-6">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  className="group flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 bg-${social.color}-500/10 rounded text-${social.color}-400 group-hover:text-white transition-colors`}
                    >
                      <social.icon size={24} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-mono mb-1">
                        CHANNEL_0{idx + 1}
                      </div>
                      <div className="text-white font-bold tracking-wide">
                        {social.label}
                      </div>
                    </div>
                  </div>
                  <Share2
                    size={18}
                    className="text-slate-600 group-hover:text-cyan-400 transition-colors"
                  />
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: FORM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative Bracket */}
            <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-3xl pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-purple-500/30 rounded-bl-3xl pointer-events-none" />

            {/* 4. Attach formRef here */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-8 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl space-y-6 relative z-10"
            >
              <div className="flex items-center gap-2 mb-8 text-slate-500 font-mono text-xs">
                <Terminal size={14} />
                <span>/usr/bin/send_message</span>
              </div>

              {/* Name Input */}
              <div className="space-y-2 group">
                <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider ml-1">
                  Identify_User
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name" // Must match EmailJS template variable (e.g. {{name}})
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-700"
                    placeholder="Enter ID..."
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-cyan-500 transition-all duration-300 group-focus-within:w-full" />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2 group">
                <label className="text-xs font-mono text-purple-400 uppercase tracking-wider ml-1">
                  Return_Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email" // Must match EmailJS template variable (e.g. {{email}})
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-all placeholder:text-slate-700"
                    placeholder="user@domain.com"
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-purple-500 transition-all duration-300 group-focus-within:w-full" />
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-2 group">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider ml-1">
                  Data_Packet
                </label>
                <div className="relative">
                  <textarea
                    name="message" // Must match EmailJS template variable (e.g. {{message}})
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-700 resize-none"
                    placeholder="Input message data..."
                    required
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-cyan-500 to-purple-500 transition-all duration-300 group-focus-within:w-full" />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative overflow-hidden group bg-cyan-950 hover:bg-cyan-900 text-cyan-400 border border-cyan-800/50 py-4 rounded-lg font-mono font-bold tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 w-0 bg-cyan-500/10 transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Cpu className="animate-spin" size={18} />
                      <span>TRANSMITTING...</span>
                    </>
                  ) : status === "success" ? (
                    <>
                      <CheckCircle size={18} className="text-green-400" />
                      <span className="text-green-400">SENT_SUCCESSFULLY</span>
                    </>
                  ) : status === "error" ? (
                    <>
                      <AlertCircle size={18} className="text-red-400" />
                      <span className="text-red-400">TRANSMISSION_FAILED</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>EXECUTE_TRANSMISSION</span>
                    </>
                  )}
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
