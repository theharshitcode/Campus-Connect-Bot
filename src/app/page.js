// // best code for campus connect bot
//  "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// // Reusable Input component
// const InputField = ({ type = "text", placeholder, value, onChange }) => (
//   <input
//     type={type}
//     placeholder={placeholder}
//     value={value}
//     onChange={(e) => onChange(e.target.value)}
//     className="p-3 border rounded-lg text-black focus:ring-2 outline-none focus:ring-blue-400"
//   />
// );

// export default function Page() {
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(""); // student/admin
//   const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" });
//   const [loginForm, setLoginForm] = useState({ email: "", password: "" });
//   const [language, setLanguage] = useState("Hindi");
//   const [allMessages, setAllMessages] = useState({});
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showLogin, setShowLogin] = useState(true);

//   const endRef = useRef(null);
//   const router = useRouter();

//   // Restore logged-in user
//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (savedUser) {
//       setUser(savedUser);
//       setRole(savedUser.role);
//     }
//   }, []);

//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [allMessages, language]);

//   const currentMessages = allMessages[language] || [];

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     if (!role) return alert("Please select a role!");
//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...signupForm, role }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         alert("Signup successful! Please login.");
//         setSignupForm({ name: "", email: "", password: "" });
//         setShowLogin(true);
//       } else {
//         alert(data.error || "Signup failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error signing up");
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!role) return alert("Please select a role!");
//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...loginForm, role }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setUser(data.user);
//         setRole(data.user.role);
//         localStorage.setItem("loggedInUser", JSON.stringify(data.user));
//         alert("Login successful!");
//       } else {
//         alert(data.error || "Login failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error logging in");
//     }
//   };

//   const sendMessage = async () => {
//     const trimmed = input.trim();
//     if (!trimmed || !user) return;
//     const newMessages = [...currentMessages, { role: "user", content: trimmed }];
//     setAllMessages((prev) => ({ ...prev, [language]: newMessages }));
//     setInput("");
//     setLoading(true);
//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user.id, language, messages: newMessages }),
//       });
//       const data = await res.json();
//       if (data.reply) {
//         setAllMessages((prev) => ({
//           ...prev,
//           [language]: [...newMessages, { role: "assistant", content: data.reply }],
//         }));
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error sending message");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpload = () => {
//     // Placeholder for admin upload functionality
//     alert("Admin upload functionality coming soon!");
//   };

//   return (
//     <main className="relative min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
//       {/* Background Image */}
//       <img
//         src="/campus2.png"
//         alt="campus"
//         className="absolute top-0 left-0 w-full h-full object-cover z-0"
//       />
//       <motion.div
//         className="w-full max-w-4xl   p-8 z-3"
//         // bg-red/10 backdrop-blur-lg shadow-2xl rounded-2xl
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="text-center text-4xl font-w-900 text-gray-800 mb-6">
//           Campus Connect bot
//         </h1>

//         {!user ? (
//           <div className="max-w-[90vw] mx-auto">
//             {!role && (
//               <div className="flex justify-around mb-4">
//                 <button
//                   onClick={() => setRole("student")}
//                   className="bg-blue-500 text-white px-6 py-2 rounded-lg"
//                 >
//                   Student
//                 </button>
//                 <button
//                   onClick={() => setRole("admin")}
//                   className="bg-green-500 text-white px-6 py-2 rounded-lg"
//                 >
//                   Admin
//                 </button>
//               </div>
//             )}
//             <AnimatePresence mode="wait ">
//               {showLogin ? (
//                 <motion.div
//                   key="login"
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.4 }}
//                   className="flex bg-white/70 rounded-xl shadow-lg overflow-hidden "
//                 >
//                   {/* Left Image Section */}
//                   <div className="w-1/3 bg-gray-100 flex items-center justify-center">
//                     <img
//                       src={role === "student" ? "/student1.png" : "/faculty.jpg"}
//                       alt="role avatar"
//                       className="h-[50vh] w-[40vh] object-cover z-0"
//                     />
//                   </div>

//                   {/* Right Form Section */}
//                 <div className="w-2/3 p-6 relative flex flex-col items-center">
//                   {/* <img
//                       src={role === "student" ? "/library.jpg" : "/digitalfaculty2.jpg"}
//                       alt="role avatar"
//                       className="absolute top-0 left-0 w-full h-full object-cover z-0"
//                     /> */}
//                     <h2 className="text-xl font-semibold text-gray-700 mb-4 z-2">Login</h2>
//                     <form onSubmit={handleLogin} className="flex flex-col gap-4 z-1">
//                       <InputField
//                         type="email"
//                         placeholder="Email"
//                         value={loginForm.email}
//                         onChange={(val) => setLoginForm({ ...loginForm, email: val })}
//                       />
//                       <InputField
//                         type="password"
//                         placeholder="Password"
//                         value={loginForm.password}
//                         onChange={(val) => setLoginForm({ ...loginForm, password: val })}
//                       />
//                       <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow">
//                         Login
//                       </button>
//                     </form>
//                     <p className="mt-4 text-sm text-gray-600 text-center">
//                       Don't have an account?{" "}
//                       <button
//                         type="button"
//                         onClick={() => setShowLogin(false)}
//                         className="text-blue-600 hover:underline"
//                       >
//                         Signup
//                       </button>
//                     </p>
//                   </div>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="signup"
//                   initial={{ opacity: 0, x: 50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -50 }}
//                   transition={{ duration: 0.4 }}
//                   className="flex bg-white/70 rounded-xl shadow-lg overflow-hidden"
//                 >
//                   {/* Left Image Section */}
//                   <div className="w-1/3 bg-gray-100 flex items-center justify-center">
//                       <img
//                       src={role === "student" ? "/library.jpg" : "/digitalfaculty2.jpg"}
//                       alt="role avatar"
//                       className="h-[50vh] object-cover z-0"
//                     />

//                   </div>

//                   {/* Right Form Section */}
//                   <div className="w-2/3 p-6">
//                     <h2 className="text-xl font-semibold text-gray-700 mb-4">Signup</h2>
//                     <form onSubmit={handleSignup} className="flex flex-col gap-4">
//                       <InputField
//                         placeholder="Name"
//                         value={signupForm.name}
//                         onChange={(val) => setSignupForm({ ...signupForm, name: val })}
//                       />
//                       <InputField
//                         type="email"
//                         placeholder="Email"
//                         value={signupForm.email}
//                         onChange={(val) => setSignupForm({ ...signupForm, email: val })}
//                       />
//                       <InputField
//                         type="password"
//                         placeholder="Password"
//                         value={signupForm.password}
//                         onChange={(val) => setSignupForm({ ...signupForm, password: val })}
//                       />
//                       <button className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow">
//                         Signup
//                       </button>
//                     </form>
//                     <p className="mt-4 text-sm text-gray-600 text-center">
//                       Already have an account?{" "}
//                       <button
//                         type="button"
//                         onClick={() => setShowLogin(true)}
//                         className="text-green-600 hover:underline"
//                       >
//                         Login
//                       </button>
//                     </p>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//           </div>
//         ) : (
//           <motion.div className="flex flex-col h-[530px] bg-gray-50 rounded-2xl shadow-lg overflow-hidden">
//             {/* Language & Logout */}
//             <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
//               <select
//                 value={language}
//                 onChange={(e) => setLanguage(e.target.value)}
//                 className="p-2 rounded-md text-black"
//               >
//                 <option>Hindi</option>
//                 <option>English</option>
//                 <option>Marwari</option>
//                 <option>Mewari</option>
//                 <option>Dhundhari</option>
//                 <option>Hadoti</option>
//                 <option>Mewati</option>
//                 <option>Wagdi</option>
//                 <option>Marathi</option>
//                 <option>Bengali</option>
//                 <option>Tamil</option>
//                 <option>Telugu</option>
//                 <option>Gujarati</option>
//                 <option>Punjabi</option>
//                 <option>Kannada</option>
//                 <option>Malayalam</option>
//                 <option>Odia</option>
//               </select>
//               <div className="flex gap-2">
//                 {role === "admin" && (
//                   <button
//                     onClick={handleUpload}
//                     className="bg-yellow-500 px-4 py-1 rounded hover:bg-yellow-600"
//                   >
//                     Upload
//                   </button>
//                 )}
//                 <button
//                   onClick={() => {
//                     localStorage.removeItem("loggedInUser");
//                     setUser(null);
//                     setRole("");
//                   }}
//                   className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>

//             {/* Chat Window */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-3 border border-b-amber-900 bg-gray-100">
//               {currentMessages.map((m, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.05 }}
//                   className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} items-end gap-2`}
//                 >
//                   {m.role !== "user" && (
//                     <img
//                       src="/logocamp.jpg"
//                       alt="avatar"
//                       className="w-8 h-8 rounded-full"
//                     />
//                   )}
//                   <div
//                     className={`max-w-xs px-4 py-2 rounded-2xl shadow ${m.role === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"
//                       }`}
//                   >
//                     {m.content}
//                   </div>
//                 </motion.div>
//               ))}
//               <div ref={endRef} />
//             </div>

//             {/* Input Box */}
//             <div className="flex items-center gap-3 p-4 bg-white border-t">
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                 placeholder={`Type your message in ${language}...`}
//                 className="flex-1 p-3 text-black border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//               />
//               <button
//                 onClick={sendMessage}
//                 disabled={loading}
//                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//               >
//                 {loading ? "Typing..." : "Send"}
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </motion.div>

//     </main>
//   );
// }  



// "use client";
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Page() {
//   const [allMessages, setAllMessages] = useState({});
//   const [language, setLanguage] = useState("English");
//   const [role, setRole] = useState("student");
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Admin data states
//   const [examDate, setExamDate] = useState("");
//   const [feesDate, setFeesDate] = useState("");

//   // Load saved data
//   useEffect(() => {
//     const savedExam = localStorage.getItem("examDate");
//     const savedFees = localStorage.getItem("feesDate");
//     if (savedExam) setExamDate(savedExam);
//     if (savedFees) setFeesDate(savedFees);
//   }, []);

//   const currentMessages = allMessages[language] || [];

//   // Upload exam date
//   const handleUploadExam = () => {
//     const date = prompt("Enter Mid Term Exam Date:", examDate || "24 Sep 2025");
//     if (date) {
//       setExamDate(date);
//       localStorage.setItem("examDate", date);
//       alert("Exam Date updated: " + date);
//     }
//   };

//   // Upload fees last date
//   const handleUploadFees = () => {
//     const date = prompt("Enter Fees Last Date:", feesDate || "20 Nov 2025");
//     if (date) {
//       setFeesDate(date);
//       localStorage.setItem("feesDate", date);
//       alert("Fees Last Date updated: " + date);
//     }
//   };

//   // Send message
//   const sendMessage = async () => {
//     const trimmed = input.trim();
//     if (!trimmed) return;

//     const newMessages = [...currentMessages, { role: "user", content: trimmed }];
//     setAllMessages((prev) => ({ ...prev, [language]: newMessages }));
//     setInput("");
//     setLoading(true);

//     try {
//       let reply = "";

//       // Exam date reply
//       if (
//         trimmed.toLowerCase().includes("mid term") ||
//         trimmed.toLowerCase().includes("exam")
//       ) {
//         reply = `📘 Your mid term exam is on ${examDate || "Not set by admin yet"}`;
//       }
//       // Fees date reply
//       else if (
//         trimmed.toLowerCase().includes("fees") ||
//         trimmed.toLowerCase().includes("last date")
//       ) {
//         reply = `💰 The last date to pay fees is ${feesDate || "Not set by admin yet"}`;
//       } else {
//         // Dummy fallback reply
//         reply = "I couldn’t get that. Please ask about exam or fees.";
//       }

//       if (reply) {
//         setAllMessages((prev) => ({
//           ...prev,
//           [language]: [...newMessages, { role: "assistant", content: reply }],
//         }));
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error sending message");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen p-4 bg-gray-100">
//       {/* Role Switch */}
//       <div className="flex justify-between mb-2">
//         <select
//           className="border p-2 rounded"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         >
//           <option value="student">Student</option>
//           <option value="admin">Admin</option>
//         </select>
//         {role === "admin" && (
//           <div className="flex gap-2">
//             <button
//               onClick={handleUploadExam}
//               className="bg-blue-500 text-white px-3 py-1 rounded"
//             >
//               Upload Exam Date
//             </button>
//             <button
//               onClick={handleUploadFees}
//               className="bg-green-500 text-white px-3 py-1 rounded"
//             >
//               Upload Fees Date
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto border p-2 rounded bg-white">
//         <AnimatePresence>
//           {(currentMessages || []).map((msg, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 5 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -5 }}
//               className={`p-2 my-1 rounded ${
//                 msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-200"
//               }`}
//             >
//               {msg.content}
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>

//       {/* Input Box */}
//       {role === "student" && (
//         <div className="mt-2 flex">
//           <input
//             type="text"
//             className="flex-1 border rounded p-2"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type your query..."
//           />
//           <button
//             onClick={sendMessage}
//             disabled={loading}
//             className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             {loading ? "..." : "Send"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }












// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Page() {
//   const [allMessages, setAllMessages] = useState({});
//   const [language, setLanguage] = useState("English");
//   const [role, setRole] = useState("student");
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [examDate, setExamDate] = useState("");
//   const [feesDate, setFeesDate] = useState("");
//   const messagesEndRef = useRef(null);

//   // Load saved data
//   useEffect(() => {
//     const savedExam = localStorage.getItem("examDate");
//     const savedFees = localStorage.getItem("feesDate");
//     if (savedExam) setExamDate(savedExam);
//     if (savedFees) setFeesDate(savedFees);
//   }, []);

//   const currentMessages = allMessages[language] || [];

//   // Auto-scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [currentMessages]);

//   const handleUploadExam = () => {
//     const date = prompt("Enter Mid Term Exam Date:", examDate || "24 Sep 2025");
//     if (date) {
//       setExamDate(date);
//       localStorage.setItem("examDate", date);
//       alert("Exam Date updated: " + date);
//     }
//   };

//   const handleUploadFees = () => {
//     const date = prompt("Enter Fees Last Date:", feesDate || "20 Nov 2025");
//     if (date) {
//       setFeesDate(date);
//       localStorage.setItem("feesDate", date);
//       alert("Fees Last Date updated: " + date);
//     }
//   };

//   const sendMessage = async () => {
//     const trimmed = input.trim();
//     if (!trimmed) return;

//     const newMessages = [...currentMessages, { role: "user", content: trimmed }];
//     setAllMessages((prev) => ({ ...prev, [language]: newMessages }));
//     setInput("");
//     setLoading(true);

//     try {
//       let reply = "";
//       if (
//         trimmed.toLowerCase().includes("mid term") ||
//         trimmed.toLowerCase().includes("exam")
//       ) {
//         reply = `📘 Your mid term exam is on ${examDate || "Not set by admin yet"}`;
//       } else if (
//         trimmed.toLowerCase().includes("fees") ||
//         trimmed.toLowerCase().includes("last date")
//       ) {
//         reply = `💰 The last date to pay fees is ${feesDate || "Not set by admin yet"}`;
//       } else {
//         reply = "❓ I couldn’t get that. Please ask about exam or fees.";
//       }

//       setAllMessages((prev) => ({
//         ...prev,
//         [language]: [...newMessages, { role: "assistant", content: reply }],
//       }));
//     } catch (err) {
//       console.error(err);
//       alert("Error sending message");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* Top Bar */}
//       <div className="flex justify-between items-center p-3 bg-white shadow-md">
//         <select
//           className="border p-2 rounded text-sm"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         >
//           <option value="student">Student</option>
//           <option value="admin">Admin</option>
//         </select>
//         {role === "admin" && (
//           <div className="flex gap-2">
//             <button
//               onClick={handleUploadExam}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
//             >
//               Upload Exam Date
//             </button>
//             <button
//               onClick={handleUploadFees}
//               className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
//             >
//               Upload Fees Date
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
//         <AnimatePresence>
//           {currentMessages.map((msg, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 5 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -5 }}
//               className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl shadow 
//                 ${msg.role === "user" 
//                   ? "ml-auto bg-blue-500 text-white rounded-br-none" 
//                   : "mr-auto bg-gray-200 text-gray-900 rounded-bl-none"}`}
//             >
//               {msg.content}
//             </motion.div>
//           ))}
//         </AnimatePresence>
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Box */}
//       {role === "student" && (
//         <div className="p-3 bg-white shadow-md flex items-center">
//           <input
//             type="text"
//             className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type your query..."
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <button
//             onClick={sendMessage}
//             disabled={loading}
//             className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full"
//           >
//             {loading ? "..." : "Send"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }








// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/navigation";

// // Reusable Input component
// const InputField = ({ type = "text", placeholder, value, onChange }) => (
//   <input
//     type={type}
//     placeholder={placeholder}
//     value={value}
//     onChange={(e) => onChange(e.target.value)}
//     className="p-3 border rounded-lg text-black focus:ring-2 outline-none focus:ring-blue-400"
//   />
// );

// export default function Page() {
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(""); // student/admin
//   const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" });
//   const [loginForm, setLoginForm] = useState({ email: "", password: "" });
//   const [language, setLanguage] = useState("Hindi");
//   const [allMessages, setAllMessages] = useState({});
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showLogin, setShowLogin] = useState(true);

//   const endRef = useRef(null);
//   const router = useRouter();

//   // Restore logged-in user
//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (savedUser) {
//       setUser(savedUser);
//       setRole(savedUser.role);
//     }
//   }, []);

//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [allMessages, language]);

//   const currentMessages = allMessages[language] || [];

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     if (!role) return alert("Please select a role!");
//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...signupForm, role }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         alert("Signup successful! Please login.");
//         setSignupForm({ name: "", email: "", password: "" });
//         setShowLogin(true);
//       } else {
//         alert(data.error || "Signup failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error signing up");
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!role) return alert("Please select a role!");
//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...loginForm, role }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setUser(data.user);
//         setRole(data.user.role);
//         localStorage.setItem("loggedInUser", JSON.stringify(data.user));
//         alert("Login successful!");
//       } else {
//         alert(data.error || "Login failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error logging in");
//     }
//   };

//   const sendMessage = async () => {
//     const trimmed = input.trim();
//     if (!trimmed || !user) return;
//     const newMessages = [...currentMessages, { role: "user", content: trimmed }];
//     setAllMessages((prev) => ({ ...prev, [language]: newMessages }));
//     setInput("");
//     setLoading(true);
//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user.id, language, messages: newMessages }),
//       });
//       const data = await res.json();
//       if (data.reply) {
//         setAllMessages((prev) => ({
//           ...prev,
//           [language]: [...newMessages, { role: "assistant", content: data.reply }],
//         }));
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error sending message");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ MongoDB connected Upload
//   const handleUpload = async () => {
//     if (role !== "admin") return alert("Only admin can upload!");

//     const type = prompt("Enter type (exam/fees):");
//     const date = prompt("Enter date (e.g. 24 Sep 2025):");

//     if (type && date) {
//       try {
//         await fetch("/api/admin/notice", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ type, date }),
//         });
//         alert(`${type} date saved in DB ✅`);
//       } catch (err) {
//         console.error(err);
//         alert("Failed to upload date ❌");
//       }
//     }
//   };

//   return (
//     <main className="relative min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
//       {/* Background Image */}
//       <img
//         src="/campus2.png"
//         alt="campus"
//         className="absolute top-0 left-0 w-full h-full object-cover z-0"
//       />
//       <motion.div
//         className="w-full max-w-4xl   p-8 z-3"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="text-center text-4xl font-w-900 text-gray-800 mb-6">
//           Campus Connect bot
//         </h1>

//         {!user ? (
//           <div className="max-w-[90vw] mx-auto">
//             {!role && (
//               <div className="flex justify-around mb-4">
//                 <button
//                   onClick={() => setRole("student")}
//                   className="bg-blue-500 text-white px-6 py-2 rounded-lg"
//                 >
//                   Student
//                 </button>
//                 <button
//                   onClick={() => setRole("admin")}
//                   className="bg-green-500 text-white px-6 py-2 rounded-lg"
//                 >
//                   Admin
//                 </button>
//               </div>
//             )}
//             <AnimatePresence mode="wait ">
//               {showLogin ? (
//                 <motion.div
//                   key="login"
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.4 }}
//                   className="flex bg-white/70 rounded-xl shadow-lg overflow-hidden "
//                 >
//                   {/* Left Image Section */}
//                   <div className="w-1/3 bg-gray-100 flex items-center justify-center">
//                     <img
//                       src={role === "student" ? "/student1.png" : "/faculty.jpg"}
//                       alt="role avatar"
//                       className="h-[50vh] w-[40vh] object-cover z-0"
//                     />
//                   </div>

//                   {/* Right Form Section */}
//                   <div className="w-2/3 p-6 relative flex flex-col items-center">
//                     <h2 className="text-xl font-semibold text-gray-700 mb-4 z-2">Login</h2>
//                     <form onSubmit={handleLogin} className="flex flex-col gap-4 z-1">
//                       <InputField
//                         type="email"
//                         placeholder="Email"
//                         value={loginForm.email}
//                         onChange={(val) => setLoginForm({ ...loginForm, email: val })}
//                       />
//                       <InputField
//                         type="password"
//                         placeholder="Password"
//                         value={loginForm.password}
//                         onChange={(val) => setLoginForm({ ...loginForm, password: val })}
//                       />
//                       <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow">
//                         Login
//                       </button>
//                     </form>
//                     <p className="mt-4 text-sm text-gray-600 text-center">
//                       Don't have an account?{" "}
//                       <button
//                         type="button"
//                         onClick={() => setShowLogin(false)}
//                         className="text-blue-600 hover:underline"
//                       >
//                         Signup
//                       </button>
//                     </p>
//                   </div>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="signup"
//                   initial={{ opacity: 0, x: 50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -50 }}
//                   transition={{ duration: 0.4 }}
//                   className="flex bg-white/70 rounded-xl shadow-lg overflow-hidden"
//                 >
//                   {/* Left Image Section */}
//                  <div className="w-1/3 bg-gray-100 flex items-center justify-center">
//                     <img
//                       src={role === "student" ? "/student1.png" : "/faculty.jpg"}
//                       alt="role avatar"
//                       className="h-[50vh] w-[40vh] object-cover z-0"
//                     />
//                   </div>

//                   {/* Right Form Section */}
//                   <div className="w-2/3 p-6">
//                     <h2 className="text-xl font-semibold text-gray-700 mb-4">Signup</h2>
//                     <form onSubmit={handleSignup} className="flex flex-col gap-4">
//                       <InputField
//                         placeholder="Name"
//                         value={signupForm.name}
//                         onChange={(val) => setSignupForm({ ...signupForm, name: val })}
//                       />
//                       <InputField
//                         type="email"
//                         placeholder="Email"
//                         value={signupForm.email}
//                         onChange={(val) => setSignupForm({ ...signupForm, email: val })}
//                       />
//                       <InputField
//                         type="password"
//                         placeholder="Password"
//                         value={signupForm.password}
//                         onChange={(val) => setSignupForm({ ...signupForm, password: val })}
//                       />
//                       <button className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow">
//                         Signup
//                       </button>
//                     </form>
//                     <p className="mt-4 text-sm text-gray-600 text-center">
//                       Already have an account?{" "}
//                       <button
//                         type="button"
//                         onClick={() => setShowLogin(true)}
//                         className="text-green-600 hover:underline"
//                       >
//                         Login
//                       </button>
//                     </p>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         ) : (
//           <motion.div className="flex flex-col h-[530px] bg-gray-50 rounded-2xl shadow-lg overflow-hidden">
//             {/* Language & Logout */}
//             <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
//               <select
//                 value={language}
//                 onChange={(e) => setLanguage(e.target.value)}
//                 className="p-2 rounded-md text-black"
//               >
//                 <option>Hindi</option>
//                 <option>English</option>
//                 <option>Marwari</option>
//                 <option>Mewari</option>
//                 <option>Dhundhari</option>
//                 <option>Hadoti</option>
//                 <option>Mewati</option>
//                 <option>Wagdi</option>
//                 <option>Marathi</option>
//                 <option>Bengali</option>
//                 <option>Tamil</option>
//                 <option>Telugu</option>
//                 <option>Gujarati</option>
//                 <option>Punjabi</option>
//                 <option>Kannada</option>
//                 <option>Malayalam</option>
//                 <option>Odia</option>
//               </select>
//               <div className="flex gap-2">
//                 {role === "admin" && (
//                   <button
//                     onClick={handleUpload}
//                     className="bg-yellow-500 px-4 py-1 rounded hover:bg-yellow-600"
//                   >
//                     Upload
//                   </button>
//                 )}
//                 <button
//                   onClick={() => {
//                     localStorage.removeItem("loggedInUser");
//                     setUser(null);
//                     setRole("");
//                   }}
//                   className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>

//             {/* Chat Window */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-3 border border-b-amber-900 bg-gray-100">
//               {currentMessages.map((m, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.05 }}
//                   className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} items-end gap-2`}
//                 >
//                   {m.role !== "user" && (
//                     <img
//                       src="/logocamp.jpg"
//                       alt="avatar"
//                       className="w-8 h-8 rounded-full"
//                     />
//                   )}
//                   <div
//                     className={`max-w-xs px-4 py-2 rounded-2xl shadow ${
//                       m.role === "user"
//                         ? "bg-blue-600 text-white rounded-br-none"
//                         : "bg-gray-200 text-gray-800 rounded-bl-none"
//                     }`}
//                   >
//                     {m.content}
//                   </div>
//                 </motion.div>
//               ))}
//               <div ref={endRef} />
//             </div>

//             {/* Input Box */}
//             <div className="flex items-center gap-3 p-4 bg-white border-t">
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                 placeholder={`Type your message in ${language}...`}
//                 className="flex-1 p-3 text-black border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//               />
//               <button
//                 onClick={sendMessage}
//                 disabled={loading}
//                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//               >
//                 {loading ? "Typing..." : "Send"}
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </motion.div>
//     </main>
//   );
// }


// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/navigation";

// // Reusable Input component
// const InputField = ({ type = "text", placeholder, value, onChange }) => (
//   <input
//     type={type}
//     placeholder={placeholder}
//     value={value}
//     onChange={(e) => onChange(e.target.value)}
//     className="p-3 border rounded-lg text-black focus:ring-2 outline-none focus:ring-blue-400"
//   />
// );

// export default function Page() {
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(""); // student/admin
//   const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" });
//   const [loginForm, setLoginForm] = useState({ email: "", password: "" });
//   const [language, setLanguage] = useState("Hindi");
//   const [allMessages, setAllMessages] = useState({});
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showLogin, setShowLogin] = useState(true);

//   const endRef = useRef(null);
//   const router = useRouter();

//   // Restore logged-in user
//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (savedUser) {
//       setUser(savedUser);
//       setRole(savedUser.role);
//     }
//   }, []);

//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [allMessages, language]);

//   const currentMessages = allMessages[language] || [];

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     if (!role) return alert("Please select a role!");
//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...signupForm, role }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         alert("Signup successful! Please login.");
//         setSignupForm({ name: "", email: "", password: "" });
//         setShowLogin(true);
//       } else {
//         alert(data.error || "Signup failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error signing up");
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!role) return alert("Please select a role!");
//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...loginForm, role }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setUser(data.user);
//         setRole(data.user.role);
//         localStorage.setItem("loggedInUser", JSON.stringify(data.user));
//         alert("Login successful!");
//       } else {
//         alert(data.error || "Login failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error logging in");
//     }
//   };

//   const sendMessage = async () => {
//     const trimmed = input.trim();
//     if (!trimmed || !user) return;
//     const newMessages = [...currentMessages, { role: "user", content: trimmed }];
//     setAllMessages((prev) => ({ ...prev, [language]: newMessages }));
//     setInput("");
//     setLoading(true);
//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user.id, language, messages: newMessages }),
//       });
//       const data = await res.json();
//       if (data.reply) {
//         setAllMessages((prev) => ({
//           ...prev,
//           [language]: [...newMessages, { role: "assistant", content: data.reply }],
//         }));
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error sending message");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ MongoDB connected Upload
//   const handleUpload = async () => {
//     if (role !== "admin") return alert("Only admin can upload!");

//     const type = prompt("Enter type (exam/fees):");
//     const date = prompt("Enter date (e.g. 24 Sep 2025):");

//     if (type && date) {
//       try {
//         await fetch("/api/admin/notice", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ type, date }),
//         });
//         alert(`${type} date saved in DB ✅`);
//       } catch (err) {
//         console.error(err);
//         alert("Failed to upload date ❌");
//       }
//     }
//   };

//   return (
//     <main className="relative min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
//       {/* Background Image */}
//       <img
//         src="/campus2.png"
//         alt="campus"
//         className="absolute top-0 left-0 w-full h-full object-cover z-0"
//       />
//       <motion.div
//         className="w-full max-w-4xl   p-8 z-3"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="text-center text-4xl font-w-900 text-gray-800 mb-6">
//           Campus Connect bot
//         </h1>

//         {!user ? (
//           <div className="max-w-[90vw] mx-auto">
//             {!role && (
//               <div className="flex justify-around mb-4">
//                 <button
//                   onClick={() => setRole("student")}
//                   className="bg-blue-500 text-white px-6 py-2 rounded-lg"
//                 >
//                   Student
//                 </button>
//                 <button
//                   onClick={() => setRole("admin")}
//                   className="bg-green-500 text-white px-6 py-2 rounded-lg"
//                 >
//                   Admin
//                 </button>
//               </div>
//             )}
//             <AnimatePresence mode="wait ">
//               {showLogin ? (
//                 <motion.div
//                   key="login"
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.4 }}
//                   className="flex bg-white/70 rounded-xl shadow-lg overflow-hidden "
//                 >
//                   {/* Left Image Section */}
//                   <div className="w-1/3 bg-gray-100 flex items-center justify-center">
//                     <img
//                       src={role === "student" ? "/student1.png" : "/faculty.jpg"}
//                       alt="role avatar"
//                       className="h-[50vh] w-[40vh] object-cover z-0"
//                     />
//                   </div>

//                   {/* Right Form Section */}
//                   <div className="w-2/3 p-6 relative flex flex-col items-center">
//                     <h2 className="text-xl font-semibold text-gray-700 mb-4 z-2">
//                       {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Login` : "Login"}
//                     </h2>
//                     <form onSubmit={handleLogin} className="flex flex-col gap-4 z-1">
//                       <InputField
//                         type="email"
//                         placeholder="Email"
//                         value={loginForm.email}
//                         onChange={(val) => setLoginForm({ ...loginForm, email: val })}
//                       />
//                       <InputField
//                         type="password"
//                         placeholder="Password"
//                         value={loginForm.password}
//                         onChange={(val) => setLoginForm({ ...loginForm, password: val })}
//                       />
//                       <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow">
//                         Login
//                       </button>
//                     </form>
//                     <p className="mt-4 text-sm text-gray-600 text-center">
//                       Don't have an account?{" "}
//                       <button
//                         type="button"
//                         onClick={() => setShowLogin(false)}
//                         className="text-blue-600 hover:underline"
//                       >
//                         Signup
//                       </button>
//                     </p>
//                   </div>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="signup"
//                   initial={{ opacity: 0, x: 50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -50 }}
//                   transition={{ duration: 0.4 }}
//                   className="flex bg-white/70 rounded-xl shadow-lg overflow-hidden"
//                 >
//                   {/* Left Image Section */}
//                  <div className="w-1/3 bg-gray-100 flex items-center justify-center">
//                     <img
//                       src={role === "student" ? "/student1.png" : "/faculty.jpg"}
//                       alt="role avatar"
//                       className="h-[50vh] w-[40vh] object-cover z-0"
//                     />
//                   </div>

//                   {/* Right Form Section */}
//                   <div className="w-2/3 p-6">
//                     <h2 className="text-xl font-semibold text-gray-700 mb-4">
//                       {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Signup` : "Signup"}
//                     </h2>
//                     <form onSubmit={handleSignup} className="flex flex-col gap-4">
//                       <InputField
//                         placeholder="Name"
//                         value={signupForm.name}
//                         onChange={(val) => setSignupForm({ ...signupForm, name: val })}
//                       />
//                       <InputField
//                         type="email"
//                         placeholder="Email"
//                         value={signupForm.email}
//                         onChange={(val) => setSignupForm({ ...signupForm, email: val })}
//                       />
//                       <InputField
//                         type="password"
//                         placeholder="Password"
//                         value={signupForm.password}
//                         onChange={(val) => setSignupForm({ ...signupForm, password: val })}
//                       />
//                       <button className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow">
//                         Signup
//                       </button>
//                     </form>
//                     <p className="mt-4 text-sm text-gray-600 text-center">
//                       Already have an account?{" "}
//                       <button
//                         type="button"
//                         onClick={() => setShowLogin(true)}
//                         className="text-green-600 hover:underline"
//                       >
//                         Login
//                       </button>
//                     </p>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         ) : (
//           // Chat UI remains same
//           <motion.div className="flex flex-col h-[530px] bg-gray-50 rounded-2xl shadow-lg overflow-hidden">
//             {/* ...existing chat code... */}
//           </motion.div>
//         )}
//       </motion.div>
//     </main>
//   );
// }






// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/navigation";

// // Reusable Input component
// const InputField = ({ type = "text", placeholder, value, onChange }) => (
//   <input
//     type={type}
//     placeholder={placeholder}
//     value={value}
//     onChange={(e) => onChange(e.target.value)}
//     className="p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-200 shadow-sm hover:shadow-md"
//   />
// );

// // Toast component
// const Toast = ({ message, type = "info", onClose }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 50 }}
//     animate={{ opacity: 1, y: 0 }}
//     exit={{ opacity: 0, y: 50 }}
//     transition={{ duration: 0.3 }}
//     className={`fixed bottom-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white z-50 ${type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-indigo-500"}`}
//   >
//     <div className="flex items-center gap-2">
//       <span>{message}</span>
//       <button onClick={onClose} className="font-bold ml-2">&times;</button>
//     </div>
//   </motion.div>
// );

// export default function Page() {
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(""); // student/admin
//   const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" });
//   const [loginForm, setLoginForm] = useState({ email: "", password: "" });
//   const [language, setLanguage] = useState("Hindi");
//   const [allMessages, setAllMessages] = useState({});
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showLogin, setShowLogin] = useState(true);
//   const [toasts, setToasts] = useState([]);
//   const endRef = useRef(null);
//   const router = useRouter();

//   const showToast = (message, type = "info", duration = 3000) => {
//     const id = Date.now();
//     setToasts((prev) => [...prev, { id, message, type }]);
//     setTimeout(() => {
//       setToasts((prev) => prev.filter((t) => t.id !== id));
//     }, duration);
//   };

//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (savedUser) {
//       setUser(savedUser);
//       setRole(savedUser.role);
//     }
//   }, []);

//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [allMessages, language]);

//   const currentMessages = allMessages[language] || [];

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     if (!role) return showToast("Please select a role!", "error");
//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...signupForm, role }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         showToast("Signup successful! Please login.", "success");
//         setSignupForm({ name: "", email: "", password: "" });
//         setShowLogin(true);
//       } else {
//         showToast(data.error || "Signup failed", "error");
//       }
//     } catch (err) {
//       console.error(err);
//       showToast("Error signing up", "error");
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!role) return showToast("Please select a role!", "error");
//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...loginForm, role }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setUser(data.user);
//         setRole(data.user.role);
//         localStorage.setItem("loggedInUser", JSON.stringify(data.user));
//         showToast("Login successful!", "success");
//       } else {
//         showToast(data.error || "Login failed", "error");
//       }
//     } catch (err) {
//       console.error(err);
//       showToast("Error logging in", "error");
//     }
//   };

//   const sendMessage = async () => {
//     const trimmed = input.trim();
//     if (!trimmed || !user) return;
//     const newMessages = [...currentMessages, { role: "user", content: trimmed }];
//     setAllMessages((prev) => ({ ...prev, [language]: newMessages }));
//     setInput("");
//     setLoading(true);
//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user.id, language, messages: newMessages }),
//       });
//       const data = await res.json();
//       if (data.reply) {
//         setAllMessages((prev) => ({
//           ...prev,
//           [language]: [...newMessages, { role: "assistant", content: data.reply }],
//         }));
//       }
//     } catch (err) {
//       console.error(err);
//       showToast("Error sending message", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpload = async () => {
//     if (role !== "admin") return showToast("Only admin can upload!", "error");
//     const type = prompt("Enter type (exam/fees):");
//     const date = prompt("Enter date (e.g. 24 Sep 2025):");
//     if (type && date) {
//       try {
//         await fetch("/api/admin/notice", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ type, date }),
//         });
//         showToast(`${type} date saved in DB ✅`, "success");
//       } catch (err) {
//         console.error(err);
//         showToast("Failed to upload date ❌", "error");
//       }
//     }
//   };

//   return (
//     <main className="relative min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-indigo-200 to-purple-300 p-4 overflow-hidden">
//       <img
//         src="/campus2.png"
//         alt="campus"
//         className="absolute top-0 left-0 w-full h-full object-cover opacity-[0.7] z-0"
//       />
//       <motion.div
//         className="w-full max-w-5xl p-6 z-10 backdrop-blur-md bg-white/40 rounded-3xl shadow-xl"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="text-center text-5xl font-extrabold text-gray-800 mb-8 animate-pulse">
//           Campus Connect Bot
//         </h1>

//         {!user ? (
//           <div className="max-w-[90vw] mx-auto">
//             {!role && (
//               <div className="flex justify-center gap-6 mb-6">
//                 <button
//                   onClick={() => setRole("student")}
//                   className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300"
//                 >
//                   Student
//                 </button>
//                 <button
//                   onClick={() => setRole("admin")}
//                   className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300"
//                 >
//                   Admin
//                 </button>
//               </div>
//             )}

//             <AnimatePresence mode="wait">
//               {showLogin ? (
//                 <motion.div
//                   key="login"
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.4 }}
//                   className="flex bg-white/70 rounded-2xl shadow-xl overflow-hidden"
//                 >
//                   <div className="w-1/3 bg-gray-100 flex items-center justify-center p-4">
//                     <img
//                       src={role === "student" ? "/student1.png" : "/faculty.jpg"}
//                       alt="role avatar"
//                       className="h-[50vh] w-[40vh] object-cover rounded-xl shadow-md"
//                     />
//                   </div>
//                   <div className="w-2/3 p-8 flex flex-col items-center">
//                     <h2 className="text-2xl font-semibold text-gray-700 mb-6">{role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Login` : "Login"}</h2>
//                     <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full">
//                       <InputField type="email" placeholder="Email" value={loginForm.email} onChange={(val) => setLoginForm({ ...loginForm, email: val })} />
//                       <InputField type="password" placeholder="Password" value={loginForm.password} onChange={(val) => setLoginForm({ ...loginForm, password: val })} />
//                       <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl shadow-lg font-semibold transition-all duration-200">
//                         Login
//                       </button>
//                     </form>
//                     <p className="mt-5 text-gray-600 text-center">
//                       Don't have an account?{" "}
//                       <button onClick={() => setShowLogin(false)} className="text-indigo-600 hover:underline font-medium">
//                         Signup
//                       </button>
//                     </p>
//                   </div>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="signup"
//                   initial={{ opacity: 0, x: 50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -50 }}
//                   transition={{ duration: 0.4 }}
//                   className="flex bg-white/70 rounded-2xl shadow-xl overflow-hidden"
//                 >
//                   <div className="w-1/3 bg-gray-100 flex items-center justify-center p-4">
//                     <img
//                       src={role === "student" ? "/student1.png" : "/faculty.jpg"}
//                       alt="role avatar"
//                       className="h-[50vh] w-[40vh] object-cover rounded-xl shadow-md"
//                     />
//                   </div>
//                   <div className="w-2/3 p-8 flex flex-col items-center">
//                     <h2 className="text-2xl font-semibold text-gray-700 mb-6">{role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Signup` : "Signup"}</h2>
//                     <form onSubmit={handleSignup} className="flex flex-col gap-5 w-full">
//                       <InputField placeholder="Name" value={signupForm.name} onChange={(val) => setSignupForm({ ...signupForm, name: val })} />
//                       <InputField type="email" placeholder="Email" value={signupForm.email} onChange={(val) => setSignupForm({ ...signupForm, email: val })} />
//                       <InputField type="password" placeholder="Password" value={signupForm.password} onChange={(val) => setSignupForm({ ...signupForm, password: val })} />
//                       <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl shadow-lg font-semibold transition-all duration-200">
//                         Signup
//                       </button>
//                     </form>
//                     <p className="mt-5 text-gray-600 text-center">
//                       Already have an account?{" "}
//                       <button onClick={() => setShowLogin(true)} className="text-emerald-600 hover:underline font-medium">
//                         Login
//                       </button>
//                     </p>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         ) : (
//           <motion.div className="flex flex-col h-[550px] bg-white rounded-3xl shadow-xl overflow-hidden">
//             {/* Language & Logout */}
//             <div className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
//               <select value={language} onChange={(e) => setLanguage(e.target.value)} className="p-2 rounded-md text-black font-medium shadow-sm">
//                 <option>Hindi</option>
//                 <option>English</option>
//                 <option>Marwari</option>
//                 <option>Mewari</option>
//                 <option>Dhundhari</option>
//                 <option>Hadoti</option>
//                 <option>Mewati</option>
//                 <option>Wagdi</option>
//                 <option>Marathi</option>
//                 <option>Bengali</option>
//                 <option>Tamil</option>
//                 <option>Telugu</option>
//                 <option>Gujarati</option>
//                 <option>Punjabi</option>
//                 <option>Kannada</option>
//                 <option>Malayalam</option>
//                 <option>Odia</option>
//               </select>
//               <div className="flex gap-3">
//                 {role === "admin" && (
//                   <button onClick={handleUpload} className="bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-2xl shadow font-medium transition-all duration-200">
//                     Upload
//                   </button>
//                 )}
//                 <button onClick={() => { localStorage.removeItem("loggedInUser"); setUser(null); setRole(""); }} className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-2xl shadow font-medium transition-all duration-200">
//                   Logout
//                 </button>
//               </div>
//             </div>

//             {/* Chat Window */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
//               {currentMessages.map((m, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.05 }}
//                   className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} items-end gap-3`}
//                 >
//                   {m.role !== "user" && (
//                     <img src="/logocamp.jpg" alt="avatar" className="w-10 h-10 rounded-full shadow" />
//                   )}
//                   <div className={`max-w-xs px-5 py-3 rounded-2xl shadow-md ${m.role === "user" ? "bg-indigo-600 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"}`}>
//                     {m.content}
//                   </div>
//                 </motion.div>
//               ))}
//               <div ref={endRef} />
//             </div>

//             {/* Input Box */}
//             <div className="flex items-center gap-3 p-4 bg-white border-t border-gray-200 shadow-inner">
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                 placeholder={`Type your message in ${language}...`}
//                 className="flex-1 p-3 text-black border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none shadow-sm hover:shadow-md transition-all duration-200"
//               />
//               <button
//                 onClick={sendMessage}
//                 disabled={loading}
//                 className="bg-indigo-600 text-white px-6 py-3 rounded-2xl hover:bg-indigo-700 font-semibold transition-all duration-200 shadow"
//               >
//                 {loading ? "Typing..." : "Send"}
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </motion.div>

//       {/* Toasts */}
//       <AnimatePresence>
//         {toasts.map((t) => (
//           <Toast key={t.id} message={t.message} type={t.type} onClose={() => setToasts((prev) => prev.filter((toast) => toast.id !== t.id))} />
//         ))}
//       </AnimatePresence>
//     </main>
//   );
// }



// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/navigation";

// // Reusable Input component
// const InputField = ({ type = "text", placeholder, value, onChange }) => (
//   <input
//     type={type}
//     placeholder={placeholder}
//     value={value}
//     onChange={(e) => onChange(e.target.value)}
//     className="p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-200 shadow-sm hover:shadow-md w-full"
//   />
// );

// // Toast component
// const Toast = ({ message, type = "info", onClose }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 50 }}
//     animate={{ opacity: 1, y: 0 }}
//     exit={{ opacity: 0, y: 50 }}
//     transition={{ duration: 0.3 }}
//     className={`fixed bottom-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white z-50 ${type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-indigo-500"}`}
//   >
//     <div className="flex items-center gap-2">
//       <span>{message}</span>
//       <button onClick={onClose} className="font-bold ml-2">&times;</button>
//     </div>
//   </motion.div>
// );

// export default function Page() {
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(""); // student/admin
//   const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" });
//   const [loginForm, setLoginForm] = useState({ email: "", password: "" });
//   const [language, setLanguage] = useState("Hindi");
//   const [allMessages, setAllMessages] = useState({});
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showLogin, setShowLogin] = useState(true);
//   const [toasts, setToasts] = useState([]);
//   const endRef = useRef(null);
//   const router = useRouter();

//   const showToast = (message, type = "info", duration = 3000) => {
//     const id = Date.now();
//     setToasts((prev) => [...prev, { id, message, type }]);
//     setTimeout(() => {
//       setToasts((prev) => prev.filter((t) => t.id !== id));
//     }, duration);
//   };

//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (savedUser) {
//       setUser(savedUser);
//       setRole(savedUser.role);
//     }
//   }, []);

//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [allMessages, language]);

//   const currentMessages = allMessages[language] || [];

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     if (!role) return showToast("Please select a role!", "error");
//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...signupForm, role }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         showToast("Signup successful! Please login.", "success");
//         setSignupForm({ name: "", email: "", password: "" });
//         setShowLogin(true);
//       } else {
//         showToast(data.error || "Signup failed", "error");
//       }
//     } catch (err) {
//       console.error(err);
//       showToast("Error signing up", "error");
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!role) return showToast("Please select a role!", "error");
//     try {
//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...loginForm, role }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setUser(data.user);
//         setRole(data.user.role);
//         localStorage.setItem("loggedInUser", JSON.stringify(data.user));
//         showToast("Login successful!", "success");
//       } else {
//         showToast(data.error || "Login failed", "error");
//       }
//     } catch (err) {
//       console.error(err);
//       showToast("Error logging in", "error");
//     }
//   };

//   const sendMessage = async () => {
//     const trimmed = input.trim();
//     if (!trimmed || !user) return;
//     const newMessages = [...currentMessages, { role: "user", content: trimmed }];
//     setAllMessages((prev) => ({ ...prev, [language]: newMessages }));
//     setInput("");
//     setLoading(true);
//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user.id, language, messages: newMessages }),
//       });
//       const data = await res.json();
//       if (data.reply) {
//         setAllMessages((prev) => ({
//           ...prev,
//           [language]: [...newMessages, { role: "assistant", content: data.reply }],
//         }));
//       }
//     } catch (err) {
//       console.error(err);
//       showToast("Error sending message", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpload = async () => {
//     if (role !== "admin") return showToast("Only admin can upload!", "error");
//     const type = prompt("Enter type (exam/fees):");
//     const date = prompt("Enter date (e.g. 24 Sep 2025):");
//     if (type && date) {
//       try {
//         await fetch("/api/admin/notice", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ type, date }),
//         });
//         showToast(`${type} date saved in DB ✅`, "success");
//       } catch (err) {
//         console.error(err);
//         showToast("Failed to upload date ❌", "error");
//       }
//     }
//   };

//   return (
//     <main className="relative min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-indigo-200 to-purple-300 p-4 overflow-hidden">
//       <img
//         src="/campus2.png"
//         alt="campus"
//         className="absolute top-0 left-0 w-full h-full object-cover opacity-[0.7] z-0"
//       />
//       <motion.div
//         className="w-full min-h-[90vh] max-w-5xl p-4 md:p-6 z-10 backdrop-blur-md bg-white/40 rounded-3xl shadow-xl"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 animate-pulse">
//           Campus Connect Bot
//         </h1>

//         {!user ? (
//           <div className="max-w-[95vw] mx-auto">
//             {!role && (
//               <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-6">
//                 <button
//                   onClick={() => setRole("student")}
//                   className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 sm:px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300 w-full sm:w-auto"
//                 >
//                   Student
//                 </button>
//                 <button
//                   onClick={() => setRole("admin")}
//                   className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 sm:px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300 w-full sm:w-auto"
//                 >
//                   Admin
//                 </button>
//               </div>
//             )}

//             <AnimatePresence mode="wait">
//               {showLogin ? (
//                 <motion.div
//                   key="login"
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 50 }}
//                   transition={{ duration: 0.4 }}
//                   className="flex flex-col md:flex-row bg-white/70 rounded-2xl shadow-xl overflow-hidden"
//                 >
//                   <div className="md:w-1/3 w-full bg-gray-100 flex items-center justify-center p-4">
//                     <img
//                       src={role === "student" ? "/student1.png" : "/faculty.jpg"}
//                       alt="role avatar"
//                       className="h-48 md:h-[50vh] w-full md:w-[40vh] object-cover rounded-xl shadow-md"
//                     />
//                   </div>
//                   <div className="md:w-2/3 w-full p-6 md:p-8 flex flex-col items-center">
//                     <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6">
//                       {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Login` : "Login"}
//                     </h2>
//                     <form onSubmit={handleLogin} className="flex flex-col gap-4 sm:gap-5 w-full">
//                       <InputField type="email" placeholder="Email" value={loginForm.email} onChange={(val) => setLoginForm({ ...loginForm, email: val })} />
//                       <InputField type="password" placeholder="Password" value={loginForm.password} onChange={(val) => setLoginForm({ ...loginForm, password: val })} />
//                       <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl shadow-lg font-semibold transition-all duration-200 w-full sm:w-auto">
//                         Login
//                       </button>
//                     </form>
//                     <p className="mt-4 sm:mt-5 text-gray-600 text-center text-sm sm:text-base">
//                       Don't have an account?{" "}
//                       <button onClick={() => setShowLogin(false)} className="text-indigo-600 hover:underline font-medium">
//                         Signup
//                       </button>
//                     </p>
//                   </div>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="signup"
//                   initial={{ opacity: 0, x: 50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -50 }}
//                   transition={{ duration: 0.4 }}
//                   className="flex flex-col md:flex-row bg-white/70 rounded-2xl shadow-xl overflow-hidden"
//                 >
//                   <div className="md:w-1/3 w-full bg-gray-100 flex items-center justify-center p-4">
//                     <img
//                       src={role === "student" ? "/student1.png" : "/faculty.jpg"}
//                       alt="role avatar"
//                       className="h-48 md:h-[50vh] w-full md:w-[40vh] object-cover rounded-xl shadow-md"
//                     />
//                   </div>
//                   <div className="md:w-2/3 w-full p-6 md:p-8 flex flex-col items-center">
//                     <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6">
//                       {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Signup` : "Signup"}
//                     </h2>
//                     <form onSubmit={handleSignup} className="flex flex-col gap-4 sm:gap-5 w-full">
//                       <InputField placeholder="Name" value={signupForm.name} onChange={(val) => setSignupForm({ ...signupForm, name: val })} />
//                       <InputField type="email" placeholder="Email" value={signupForm.email} onChange={(val) => setSignupForm({ ...signupForm, email: val })} />
//                       <InputField type="password" placeholder="Password" value={signupForm.password} onChange={(val) => setSignupForm({ ...signupForm, password: val })} />
//                       <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl shadow-lg font-semibold transition-all duration-200 w-full sm:w-auto">
//                         Signup
//                       </button>
//                     </form>
//                     <p className="mt-4 sm:mt-5 text-gray-600 text-center text-sm sm:text-base">
//                       Already have an account?{" "}
//                       <button onClick={() => setShowLogin(true)} className="text-emerald-600 hover:underline font-medium">
//                         Login
//                       </button>
//                     </p>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         ) : (
//           <motion.div className="flex flex-col h-[550px] md:h-[650px] bg-white rounded-3xl shadow-xl overflow-hidden">
//             {/* Language & Logout */}
//             <div className="absolute w-full flex flex-col sm:flex-row justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white gap-2 sm:gap-0 top-0 z-3">
//               <select value={language} onChange={(e) => setLanguage(e.target.value)} className="p-2 rounded-md text-black font-medium shadow-sm w-full sm:w-auto">
//                 <option>Hindi</option>
//                 <option>English</option>
//                 <option>Marwari</option>
//                 <option>Mewari</option>
//                 <option>Dhundhari</option>
//                 <option>Hadoti</option>
//                 <option>Mewati</option>
//                 <option>Wagdi</option>
//                 <option>Marathi</option>
//                 <option>Bengali</option>
//                 <option>Tamil</option>
//                 <option>Telugu</option>
//                 <option>Gujarati</option>
//                 <option>Punjabi</option>
//                 <option>Kannada</option>
//                 <option>Malayalam</option>
//                 <option>Odia</option>
//               </select>
//               <div className="flex gap-2 sm:gap-3 mt-2 sm:mt-0">
//                 {role === "admin" && (
//                   <button onClick={handleUpload} className="bg-yellow-400 hover:bg-yellow-500 px-3 sm:px-5 py-2 rounded-2xl shadow font-medium transition-all duration-200 w-full sm:w-auto">
//                     Upload
//                   </button>
//                 )}
//                 <button onClick={() => { localStorage.removeItem("loggedInUser"); setUser(null); setRole(""); }} className="bg-red-500 hover:bg-red-600 px-3 sm:px-5 py-2 rounded-2xl shadow font-medium transition-all duration-200 w-full sm:w-auto">
//                   Logout
//                 </button>
//               </div>
//             </div>

//             {/* Chat Window */}
//             <div className="flex-1 min-h-[5vh]: overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-100">
//               {currentMessages.map((m, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.05 }}
//                   className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} items-end gap-2 sm:gap-3`}
//                 >
//                   {m.role !== "user" && (
//                     <img src="/logocamp.jpg" alt="avatar" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow" />
//                   )}
//                   <div className={`max-w-[70%] sm:max-w-xs px-3 sm:px-5 py-2 sm:py-3 rounded-2xl shadow-md ${m.role === "user" ? "bg-indigo-600 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"}`}>
//                     {m.content}
//                   </div>
//                 </motion.div>
//               ))}
//               <div ref={endRef} />
//             </div>

//             {/* Input Box */}
//             <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white border-t border-gray-200 shadow-inner">
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                 placeholder={`Type your message in ${language}...`}
//                 className="flex-1 p-3 text-black border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none shadow-sm hover:shadow-md transition-all duration-200 w-full"
//               />
//               <button
//                 onClick={sendMessage}
//                 disabled={loading}
//                 className="bg-indigo-600 text-white px-6 py-3 rounded-2xl hover:bg-indigo-700 font-semibold transition-all duration-200 shadow w-full sm:w-auto"
//               >
//                 {loading ? "Typing..." : "Send"}
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </motion.div>

//       {/* Toasts */}
//       <AnimatePresence>
//         {toasts.map((t) => (
//           <Toast key={t.id} message={t.message} type={t.type} onClose={() => setToasts((prev) => prev.filter((toast) => toast.id !== t.id))} />
//         ))}
//       </AnimatePresence>
//     </main>
//   );
// }













"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Reusable Input component
const InputField = ({ type = "text", placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-200 shadow-sm hover:shadow-md w-full"
  />
);

// Toast component
const Toast = ({ message, type = "info", onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.3 }}
    className={`fixed bottom-5 right-5 px-4 py-2 rounded-lg shadow-lg text-white z-50 ${type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-indigo-500"
      }`}
  >
    <div className="flex items-center gap-2">
      <span>{message}</span>
      <button onClick={onClose} className="font-bold ml-2">
        &times;
      </button>
    </div>
  </motion.div>
);

export default function Page() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(""); // student/admin
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [language, setLanguage] = useState("Hindi");
  const [allMessages, setAllMessages] = useState({});
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [toasts, setToasts] = useState([]);
  const endRef = useRef(null);
  const router = useRouter();

  const showToast = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (savedUser) {
      setUser(savedUser);
      setRole(savedUser.role);
    }
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages, language]);

  const currentMessages = allMessages[language] || [];

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!role) return showToast("Please select a role!", "error");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...signupForm, role }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Signup successful! Please login.", "success");
        setSignupForm({ name: "", email: "", password: "" });
        setShowLogin(true);
      } else {
        showToast(data.error || "Signup failed", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error signing up", "error");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!role) return showToast("Please select a role!", "error");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...loginForm, role }),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setRole(data.user.role);
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        showToast("Login successful!", "success");
      } else {
        showToast(data.error || "Login failed", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error logging in", "error");
    }
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || !user) return;
    const newMessages = [...currentMessages, { role: "user", content: trimmed }];
    setAllMessages((prev) => ({ ...prev, [language]: newMessages }));
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, language, messages: newMessages }),
      });
      const data = await res.json();
      if (data.reply) {
        setAllMessages((prev) => ({
          ...prev,
          [language]: [...newMessages, { role: "assistant", content: data.reply }],
        }));
      }
    } catch (err) {
      console.error(err);
      showToast("Error sending message", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (role !== "admin") return showToast("Only admin can upload!", "error");
    const type = prompt("Enter type (exam/fees):");
    const date = prompt("Enter date (e.g. 24 Sep 2025):");
    if (type && date) {
      try {
        await fetch("/api/admin/notice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, date }),
        });
        showToast(`${type} date saved in DB ✅`, "success");
      } catch (err) {
        console.error(err);
        showToast("Failed to upload date ❌", "error");
      }
    }
  };

  return (
    <main className="relative min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-indigo-200 to-purple-300 p-4 overflow-hidden">
      <img
        src="/campus2.png"
        alt="campus"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-[0.7] z-0"
      />
      <motion.div
        className="w-full max-w-5xl p-6 z-10 backdrop-blur-md bg-white/40 rounded-3xl shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-center text-5xl font-extrabold text-gray-800 mb-8 animate-pulse">
          Campus Connect Bot
        </h1>

        {!user ? (
          <div className="max-w-[90vw] mx-auto flex flex-col items-center gap-6">
            {!role && (
              <div className="flex flex-col sm:flex-row justify-center gap-6 mb-6 w-full">
                <button
                  onClick={() => setRole("student")}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300 w-full sm:w-auto"
                >
                  Student
                </button>
                <button
                  onClick={() => setRole("admin")}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300 w-full sm:w-auto"
                >
                  Admin
                </button>
              </div>
            )}

            <AnimatePresence mode="wait">
              {showLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col sm:flex-row bg-white/70 rounded-2xl shadow-xl overflow-hidden w-full"
                >
                  <div className="w-full sm:w-1/3 bg-gray-100 flex items-center justify-center p-4">
                    <img
                      src={role === "student" ? "/student1.png" : "/faculty.jpg"}
                      alt="role avatar"
                      className="h-auto max-h-[40vh] sm:max-h-[50vh] w-full object-cover rounded-xl shadow-md"
                    />
                  </div>
                  <div className="w-full sm:w-2/3 p-6 sm:p-8 flex flex-col items-center">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center sm:text-left">
                      {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Login` : "Login"}
                    </h2>
                    <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full">
                      <InputField
                        type="email"
                        placeholder="Email"
                        value={loginForm.email}
                        onChange={(val) => setLoginForm({ ...loginForm, email: val })}
                      />
                      <InputField
                        type="password"
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={(val) => setLoginForm({ ...loginForm, password: val })}
                      />
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl shadow-lg font-semibold transition-all duration-200 w-full sm:w-auto">
                        Login
                      </button>
                    </form>
                    <p className="mt-5 text-gray-600 text-center">
                      Don't have an account?{" "}
                      <button onClick={() => setShowLogin(false)} className="text-indigo-600 hover:underline font-medium">
                        Signup
                      </button>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col sm:flex-row bg-white/70 rounded-2xl shadow-xl overflow-hidden w-full"
                >
                  <div className="w-full sm:w-1/3 bg-gray-100 flex items-center justify-center p-4">
                    <img
                      src={role === "student" ? "/student1.png" : "/faculty.jpg"}
                      alt="role avatar"
                      className="h-auto max-h-[40vh] sm:max-h-[50vh] w-full object-cover rounded-xl shadow-md"
                    />
                  </div>
                  <div className="w-full sm:w-2/3 p-6 sm:p-8 flex flex-col items-center">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center sm:text-left">
                      {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Signup` : "Signup"}
                    </h2>
                    <form onSubmit={handleSignup} className="flex flex-col gap-5 w-full">
                      <InputField placeholder="Name" value={signupForm.name} onChange={(val) => setSignupForm({ ...signupForm, name: val })} />
                      <InputField
                        type="email"
                        placeholder="Email"
                        value={signupForm.email}
                        onChange={(val) => setSignupForm({ ...signupForm, email: val })}
                      />
                      <InputField
                        type="password"
                        placeholder="Password"
                        value={signupForm.password}
                        onChange={(val) => setSignupForm({ ...signupForm, password: val })}
                      />
                      <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl shadow-lg font-semibold transition-all duration-200 w-full sm:w-auto">
                        Signup
                      </button>
                    </form>
                    <p className="mt-5 text-gray-600 text-center">
                      Already have an account?{" "}
                      <button onClick={() => setShowLogin(true)} className="text-emerald-600 hover:underline font-medium">
                        Login
                      </button>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div className="flex flex-col h-[550px] bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Chat Window and Input box remain unchanged */}
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="p-2 rounded-md text-black font-medium shadow-sm"
              >
                <option>Hindi</option>
                <option>English</option>
                <option>Marwari</option>
                <option>Mewari</option>
                <option>Dhundhari</option>
                <option>Hadoti</option>
                <option>Mewati</option>
                <option>Wagdi</option>
                <option>Marathi</option>
                <option>Bengali</option>
                <option>Tamil</option>
                <option>Telugu</option>
                <option>Gujarati</option>
                <option>Punjabi</option>
                <option>Kannada</option>
                <option>Malayalam</option>
                <option>Odia</option>
              </select>
              <div className="flex gap-3">
                {role === "admin" && (
                  <button
                    onClick={handleUpload}
                    className="bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-2xl shadow font-medium transition-all duration-200"
                  >
                    Upload
                  </button>
                )}
                <button
                  onClick={() => {
                    localStorage.removeItem("loggedInUser");
                    setUser(null);
                    setRole("");
                  }}
                  className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-2xl shadow font-medium transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
              {currentMessages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} items-end gap-3`}
                >
                  {m.role !== "user" && <img src="/logocamp.jpg" alt="avatar" className="w-10 h-10 rounded-full shadow" />}
                  <div
                    className={`max-w-xs px-5 py-3 rounded-2xl shadow-md ${m.role === "user" ? "bg-indigo-600 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"
                      }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}
              <div ref={endRef} />
            </div>
            {/* Input Box */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white border-t border-gray-200 shadow-inner">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={`Type your message in ${language}...`}
                className="flex-1 p-3 text-black border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none shadow-sm hover:shadow-md transition-all duration-200 w-full"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-indigo-600 text-white px-6 py-3 rounded-2xl hover:bg-indigo-700 font-semibold transition-all duration-200 shadow w-full sm:w-auto"
              >
                {loading ? "Typing..." : "Send"}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {toasts.map((t) => (
          <Toast key={t.id} message={t.message} type={t.type} onClose={() => setToasts((prev) => prev.filter((toast) => toast.id !== t.id))} />
        ))}
      </AnimatePresence>
    </main>
  );
}
