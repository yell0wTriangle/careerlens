import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Sparkles,
  Sun,
  Moon,
  Bot,
  MessageSquare,
  X,
  Send,
  FileSearch,
  LayoutTemplate,
  KeyRound,
  TrendingUp,
  PenTool,
  ChevronRight,
  Target,
  CheckCircle2,
  AlertCircle,
  Check,
  LayoutDashboard,
  User as UserIcon,
  Upload,
} from "lucide-react";
import OverlaySidebarNav from "../components/OverlaySidebarNav";

// --- Theme Configurations ---
const lightTheme = {
  "--card": "#FFFFFF",
  "--muted": "#EBE6DC",
  "--accent": "#FFD166",
  "--border": "#E4DDD0",
  "--radius": "2.5rem",
  "--input-radius": "1.5rem",
  "--primary": "#F95738",
  "--secondary": "#EE4266",
  "--tertiary": "#424AE7",
  "--background": "#F6F4EE",
  "--foreground": "#1C1917",
  "--primary-foreground": "#FFFFFF",

  "--card-glass": "rgba(255, 255, 255, 0.85)",
  "--header-glass": "rgba(255, 255, 255, 0.4)",
  "--input-glass": "rgba(255, 255, 255, 0.5)",
  "--border-glass": "rgba(255, 255, 255, 0.6)",
  "--card-solid": "#FFFFFF",

  "--primary-glow": "rgba(249, 87, 56, 0.15)",
  "--secondary-glow": "rgba(238, 66, 102, 0.15)",
  "--tertiary-glow": "rgba(66, 74, 231, 0.12)",

  // Striking Bento Box Colors (Light Mode)
  "--color-box1-bg": "#FFFFFF",
  "--color-box1-border": "#E4DDD0",
  "--color-box1-text": "#1C1917",
  "--color-box1-muted": "rgba(28, 25, 23, 0.65)",
  "--color-box1-icon-bg": "rgba(66, 74, 231, 0.1)",
  "--color-box1-icon": "#424AE7",

  "--color-box2-bg": "#EE4266",
  "--color-box2-border": "#EE4266",
  "--color-box2-text": "#FFFFFF",
  "--color-box2-muted": "rgba(255, 255, 255, 0.9)",
  "--color-box2-icon-bg": "rgba(255, 255, 255, 0.2)",
  "--color-box2-icon": "#FFFFFF",

  "--color-box3-bg": "#F95738",
  "--color-box3-border": "#F95738",
  "--color-box3-text": "#FFFFFF",
  "--color-box3-muted": "rgba(255, 255, 255, 0.9)",
  "--color-box3-icon-bg": "rgba(255, 255, 255, 0.2)",
  "--color-box3-icon": "#FFFFFF",

  "--color-box4-bg": "#424AE7",
  "--color-box4-border": "#424AE7",
  "--color-box4-text": "#FFFFFF",
  "--color-box4-muted": "rgba(255, 255, 255, 0.9)",
  "--color-box4-icon-bg": "rgba(255, 255, 255, 0.2)",
  "--color-box4-icon": "#FFFFFF",
};

const darkTheme = {
  "--card": "#1C1917",
  "--muted": "#292524",
  "--accent": "#FFD166",
  "--border": "#36312E",
  "--radius": "2.5rem",
  "--input-radius": "1.5rem",
  "--primary": "#FF6B4A",
  "--secondary": "#FF5277",
  "--tertiary": "#6B72FF",
  "--background": "#0C0A09",
  "--foreground": "#F6F4EE",
  "--primary-foreground": "#FFFFFF",

  "--card-glass": "rgba(28, 25, 23, 0.85)",
  "--header-glass": "rgba(41, 37, 36, 0.5)",
  "--input-glass": "rgba(41, 37, 36, 0.5)",
  "--border-glass": "rgba(255, 255, 255, 0.12)",
  "--card-solid": "#1C1917",

  "--primary-glow": "rgba(255, 107, 74, 0.12)",
  "--secondary-glow": "rgba(255, 82, 119, 0.12)",
  "--tertiary-glow": "rgba(107, 114, 255, 0.12)",

  // Unified Deep Slate Colors (Dark Mode)
  "--color-box1-bg": "#18181B",
  "--color-box1-border": "#3F3F46",
  "--color-box1-text": "#F6F4EE",
  "--color-box1-muted": "rgba(246, 244, 238, 0.65)",
  "--color-box1-icon-bg": "rgba(107, 114, 255, 0.15)",
  "--color-box1-icon": "#6B72FF",

  "--color-box2-bg": "#18181B",
  "--color-box2-border": "#3F3F46",
  "--color-box2-text": "#F6F4EE",
  "--color-box2-muted": "rgba(246, 244, 238, 0.65)",
  "--color-box2-icon-bg": "rgba(255, 82, 119, 0.15)",
  "--color-box2-icon": "#FF5277",

  "--color-box3-bg": "#18181B",
  "--color-box3-border": "#3F3F46",
  "--color-box3-text": "#F6F4EE",
  "--color-box3-muted": "rgba(246, 244, 238, 0.65)",
  "--color-box3-icon-bg": "rgba(255, 107, 74, 0.15)",
  "--color-box3-icon": "#FF6B4A",

  "--color-box4-bg": "#18181B",
  "--color-box4-border": "#3F3F46",
  "--color-box4-text": "#F6F4EE",
  "--color-box4-muted": "rgba(246, 244, 238, 0.65)",
  "--color-box4-icon-bg": "rgba(255, 209, 102, 0.15)",
  "--color-box4-icon": "#FFD166",
};

// --- Mock Data ---
const analysisData = {
  score: 78,
  targetRole: "Senior React Engineer",
  summary:
    "Your resume demonstrates a strong foundation in modern web development, particularly with React and TypeScript. However, for a Senior-level position, ATS systems and recruiters are looking for deeper technical impact and architectural decision-making. Your current formatting is generally clean, but certain crucial keywords found in the target job description are missing, and several bullet points lack quantifiable metrics.",
  categories: [
    {
      id: 1,
      boxId: 1,
      title: "ATS & Formatting",
      icon: <LayoutTemplate size={24} />,
      description:
        "Machine readability is good, but standardizing your date formats and removing complex multi-column layouts in the skills section will ensure 100% parsing accuracy.",
      action: "Fix 2 formatting issues",
    },
    {
      id: 2,
      boxId: 3, // Orange box in light mode
      title: "Keyword Optimization",
      icon: <KeyRound size={24} />,
      description:
        "Missing critical domain keywords: 'Micro-frontends', 'CI/CD pipelines', 'State Management (Zustand/Redux)', and 'Web Performance Optimization'.",
      action: "Add 6 suggested keywords",
    },
    {
      id: 3,
      boxId: 4, // Blue box in light mode
      title: "Impact & Metrics",
      icon: <TrendingUp size={24} />,
      description:
        "Most bullet points read like job responsibilities rather than achievements. Quantify improvements (e.g., 'Reduced load time by X%').",
      action: "Quantify 4 bullet points",
    },
    {
      id: 4,
      boxId: 2, // Pink box in light mode
      title: "Tone & Clarity",
      icon: <PenTool size={24} />,
      description:
        "The professional summary is slightly passive. Use stronger action verbs (Architected, Spearheaded, Engineered) to assert senior-level authority.",
      action: "Review 3 tone suggestions",
    },
  ],
};

export default function Results({
  onOpenDashboard,
  onOpenResumeAnalysis,
  onOpenMockInterview,
  onOpenProfile,
  onOpenLanding,
  isDarkMode: controlledIsDarkMode,
  onToggleTheme,
}) {
  const [internalDarkMode, setInternalDarkMode] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      role: "ai",
      text: "Hi! I'm your AI Resume Coach. Do you need help rewriting any specific bullet points from the analysis?",
    },
  ]);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  const chatEndRef = useRef(null);

  const isDarkMode =
    typeof controlledIsDarkMode === "boolean"
      ? controlledIsDarkMode
      : internalDarkMode;
  const toggleTheme = () => {
    if (onToggleTheme) {
      onToggleTheme();
      return;
    }
    setInternalDarkMode((prev) => !prev);
  };
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(analysisData.score);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeModal]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { role: "user", text: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "That's a great question! Let's rephrase that bullet point to focus more on the measurable impact of your work. How about: 'Engineered a scalable React architecture that improved page load speeds by 35% through custom hooks and virtualization...'",
        },
      ]);
    }, 1000);
  };

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (animatedScore / 100) * circumference;
  const scoreColor =
    animatedScore >= 80
      ? "var(--tertiary)"
      : animatedScore >= 60
        ? "var(--accent)"
        : "var(--primary)";

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fira+Code:wght@400;500;700&display=swap');
        
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        
        @keyframes floatSlow { 
          0%, 100% { transform: translateY(0) rotate(12deg); } 
          50% { transform: translateY(-20px) rotate(16deg); } 
        }
        @keyframes floatReverse { 
          0%, 100% { transform: translateY(0) rotate(-12deg); } 
          50% { transform: translateY(-25px) rotate(-8deg); } 
        }
        
        .animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-scale-in { animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        
        .delay-75 { animation-delay: 75ms; }
        .delay-150 { animation-delay: 150ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .animate-float { animation: floatSlow 8s ease-in-out infinite; }
        .animate-float-reverse { animation: floatReverse 10s ease-in-out infinite; }

        .gauge-circle { transition: stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
        
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        :root {
          transition: background-color 0.5s ease;
        }

        .bento-btn {
          background-color: rgba(255, 255, 255, 0.15);
        }
        .bento-box-1 .bento-btn {
          background-color: rgba(0, 0, 0, 0.05);
          color: var(--color-box1-text);
        }
        .bento-box-1 .bento-btn:hover {
          background-color: var(--color-box1-text);
          color: var(--card);
        }
        .bento-box-2 .bento-btn:hover { background-color: #FFFFFF; color: var(--color-box2-border); }
        .bento-box-3 .bento-btn:hover { background-color: #FFFFFF; color: var(--color-box3-border); }
        .bento-box-4 .bento-btn:hover { background-color: #FFFFFF; color: var(--color-box4-border); }
      `,
        }}
      />

      <div
        style={currentTheme}
        className="relative w-full min-h-screen flex flex-col overflow-x-hidden overflow-y-auto bg-[var(--background)] font-['Plus_Jakarta_Sans',sans-serif] text-[var(--foreground)] selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)] transition-colors duration-500 pb-24"
      >
        {/* Backdrop for blurring the main content */}
        <OverlaySidebarNav
          isOpen={isNavOpen}
          setIsOpen={setIsNavOpen}
          activeItem="resume"
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          onOpenLanding={onOpenLanding}
          onOpenDashboard={onOpenDashboard}
          onOpenResumeAnalysis={undefined}
          onOpenMockInterview={onOpenMockInterview}
          onOpenProfile={onOpenProfile}
          backdropZClass="z-[80]"
          navZClass="z-[90]"
          inactiveButtonClass="bg-[var(--input-glass)] border border-transparent hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] text-[var(--foreground)] shadow-sm"
          themeButtonClass="bg-[var(--input-glass)] border border-transparent hover:border-[var(--border)] hover:bg-[var(--background)] text-[var(--foreground)] shadow-sm"
        />

        {/* Ambient Glows */}
        <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,var(--primary-glow)_0%,transparent_60%)] pointer-events-none z-0 transition-colors duration-500"></div>
        <div className="fixed top-[0%] right-[-10%] w-[50%] h-[70%] bg-[radial-gradient(circle_at_center,var(--tertiary-glow)_0%,transparent_60%)] pointer-events-none z-0 transition-colors duration-500"></div>
        <div className="fixed bottom-[-20%] left-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,var(--secondary-glow)_0%,transparent_60%)] pointer-events-none z-0 transition-colors duration-500"></div>

        {/* Floating Shapes */}
        <div className="fixed top-[20%] left-[5%] md:left-[10%] flex gap-2 opacity-20 pointer-events-none animate-float z-0">
          <div className="w-24 h-24 bg-[var(--tertiary)] rounded-[2rem] backdrop-blur-md shadow-2xl"></div>
        </div>
        <div className="fixed bottom-[30%] right-[5%] md:right-[10%] flex gap-2 opacity-10 pointer-events-none animate-float-reverse z-0">
          <div className="w-32 h-32 bg-[var(--primary)] rounded-full backdrop-blur-md shadow-2xl"></div>
        </div>

        <header className="relative z-20 w-full px-6 py-6 flex items-center justify-between max-w-[1200px] mx-auto animate-fade-in-up">
          <button className="flex items-center gap-2 text-sm font-bold text-[var(--foreground)]/60 hover:text-[var(--primary)] hover:-translate-x-1 active:scale-95 transition-all font-['Fira_Code',monospace] uppercase tracking-widest">
            <ArrowLeft size={16} /> Dashboard
          </button>
        </header>

        <main className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col gap-8 items-center mt-2">
          <div className="w-full flex items-center gap-4 mb-2 animate-fade-in-up delay-75 justify-center sm:justify-start">
            <div className="w-12 h-12 bg-[var(--primary)]/10 text-[var(--primary)] rounded-[1.2rem] flex items-center justify-center rotate-3">
              <FileSearch size={24} className="-rotate-3" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-[var(--foreground)]">
              Results & Insights
            </h1>
          </div>

          <section className="w-full bg-[var(--card-glass)] backdrop-blur-2xl border border-[var(--border-glass)] rounded-[var(--radius)] p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] animate-fade-in-up delay-150 flex flex-col md:flex-row items-center gap-10 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-shadow relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col items-center justify-center shrink-0">
              <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                <svg
                  className="w-full h-full transform -rotate-90 absolute inset-0"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    className="opacity-50"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke={scoreColor}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="gauge-circle"
                  />
                </svg>
                <div className="flex flex-col items-center justify-center relative z-10 text-center">
                  <span
                    className="text-4xl font-black tracking-tighter"
                    style={{ color: scoreColor }}
                  >
                    {animatedScore}%
                  </span>
                  <span className="text-xs font-bold text-[var(--foreground)]/50 uppercase tracking-widest font-['Fira_Code',monospace] mt-1">
                    Match
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-start text-left relative z-10">
              <div className="px-4 py-1.5 bg-[var(--foreground)] text-[var(--background)] rounded-full text-xs font-bold tracking-[0.15em] uppercase font-['Fira_Code',monospace] mb-4 flex items-center gap-2 shadow-sm">
                <Target size={14} /> Target: {analysisData.targetRole}
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)] mb-4">
                Executive Summary
              </h2>
              <p className="text-[var(--foreground)]/80 font-medium text-lg leading-relaxed">
                {analysisData.summary}
              </p>
            </div>
          </section>

          <section className="w-full flex flex-col gap-6 animate-fade-in-up delay-200">
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)] px-2">
              Areas for Improvement
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {analysisData.categories.map((cat, idx) => (
                <div
                  key={cat.id}
                  className={`border rounded-[var(--radius)] p-8 shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 flex flex-col group cursor-default bento-box-${cat.boxId}`}
                  style={{
                    animationDelay: `${200 + idx * 50}ms`,
                    backgroundColor: `var(--color-box${cat.boxId}-bg)`,
                    borderColor: `var(--color-box${cat.boxId}-border)`,
                    color: `var(--color-box${cat.boxId}-text)`,
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-14 h-14 rounded-[1.2rem] flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-sm"
                      style={{
                        backgroundColor: `var(--color-box${cat.boxId}-icon-bg)`,
                        color: `var(--color-box${cat.boxId}-icon)`,
                      }}
                    >
                      {cat.icon}
                    </div>
                    <h3 className="text-xl font-extrabold tracking-tight">
                      {cat.title}
                    </h3>
                  </div>

                  <p
                    className="font-medium text-base leading-relaxed mb-6 flex-1"
                    style={{ color: `var(--color-box${cat.boxId}-muted)` }}
                  >
                    {cat.description}
                  </p>

                  <button
                    onClick={() => setActiveModal(cat)}
                    className="bento-btn self-start px-5 py-2.5 rounded-full border border-transparent font-bold text-sm flex items-center gap-2 active:scale-95 group/btn transition-colors duration-300"
                    style={
                      isDarkMode
                        ? {
                            backgroundColor: "rgba(255,255,255,0.05)",
                            color: "var(--foreground)",
                          }
                        : {}
                    }
                  >
                    {cat.action}
                    <ChevronRight
                      size={16}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>

        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex flex-col items-end">
          <div
            className={`mb-4 w-[calc(100vw-3rem)] sm:w-[380px] h-[500px] max-h-[70vh] bg-[var(--card-glass)] backdrop-blur-3xl border border-[var(--border-glass)] shadow-[0_30px_80px_rgba(0,0,0,0.15)] rounded-[2rem] flex flex-col overflow-hidden transition-all duration-200 ease-out origin-bottom-right ${isChatOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-0 opacity-0 pointer-events-none absolute bottom-0 right-0"}`}
          >
            <div className="p-5 border-b border-[var(--border)]/50 bg-[var(--card-solid)] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--tertiary)] to-[var(--primary)] flex items-center justify-center text-white shadow-md">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-[var(--foreground)] text-base">
                    Resume Coach
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--input-glass)] hover:bg-[var(--muted)] text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors active:scale-95"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 hide-scrollbar bg-[var(--background)]/50">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"} animate-scale-in`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div
                    className={`max-w-[85%] p-4 text-sm font-medium leading-relaxed shadow-sm ${msg.role === "user" ? "bg-[var(--foreground)] text-[var(--background)] rounded-[1.5rem] rounded-tr-sm" : "bg-[var(--card-solid)] border border-[var(--border)] text-[var(--foreground)]/80 rounded-[1.5rem] rounded-tl-sm"}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-[var(--card-solid)] border-t border-[var(--border)]/50 shrink-0">
              <form
                onSubmit={handleSendMessage}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask me to rewrite a bullet..."
                  className="w-full bg-[var(--input-glass)] border border-[var(--border)] rounded-[var(--input-radius)] py-3.5 pl-5 pr-12 text-sm font-medium text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--tertiary)]/50 placeholder:text-[var(--foreground)]/40 transition-all shadow-inner"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className={`absolute right-2 w-9 h-9 rounded-full flex items-center justify-center transition-all ${chatInput.trim() ? "bg-[var(--tertiary)] text-white hover:scale-110 active:scale-95 shadow-md shadow-[var(--tertiary)]/20" : "bg-transparent text-[var(--foreground)]/30 cursor-not-allowed"}`}
                >
                  <Send
                    size={16}
                    className={chatInput.trim() ? "-ml-0.5 mt-0.5" : ""}
                  />
                </button>
              </form>
            </div>
          </div>

          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-110 active:scale-95 animate-fade-in-up delay-300 z-50 ${isChatOpen ? "bg-[var(--card-solid)] border border-[var(--border)] text-[var(--foreground)]" : "bg-[var(--foreground)] text-[var(--background)]"}`}
          >
            {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
            {!isChatOpen && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-[var(--primary)] border-2 border-[var(--background)] rounded-full"></span>
            )}
          </button>
        </div>

        {activeModal && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 animate-fade-in-up"
            style={{ animationDuration: "0.2s" }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-opacity"
              onClick={() => setActiveModal(null)}
            ></div>

            <div
              className="relative w-full max-w-6xl h-[90vh] bg-[var(--card-solid)] border border-[var(--border)] rounded-[var(--radius)] shadow-2xl flex flex-col overflow-hidden animate-scale-in"
              style={{ animationDuration: "0.3s", transformOrigin: "center" }}
            >
              <div
                className="px-6 py-6 md:px-10 md:py-8 flex items-center justify-between shrink-0"
                style={{
                  backgroundColor: `var(--color-box${activeModal.boxId}-bg)`,
                  color: `var(--color-box${activeModal.boxId}-text)`,
                  borderBottom: `1px solid var(--color-box${activeModal.boxId}-border)`,
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-[1rem] flex items-center justify-center shadow-sm"
                    style={{
                      backgroundColor: `var(--color-box${activeModal.boxId}-icon-bg)`,
                      color: `var(--color-box${activeModal.boxId}-icon)`,
                    }}
                  >
                    {activeModal.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                      {activeModal.title}
                    </h2>
                    <p className="font-medium opacity-80 text-sm mt-1">
                      Interactive Editor
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/10 active:scale-95 transition-all"
                  style={{ color: `var(--color-box${activeModal.boxId}-text)` }}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:px-16 bg-[var(--background)] flex flex-col gap-8 hide-scrollbar">
                <div className="bg-[var(--card-solid)] border border-[var(--border)] rounded-3xl p-6 shadow-sm flex items-start gap-4 max-w-5xl mx-auto w-full shrink-0">
                  <div className="mt-1 text-[var(--primary)]">
                    <AlertCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">
                      AI Recommendation
                    </h3>
                    <p className="text-[var(--foreground)]/70 font-medium leading-relaxed">
                      {activeModal.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto w-full pb-12 items-stretch shrink-0">
                  <div className="flex-1 flex flex-col bg-[var(--card-glass)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-[var(--border)] bg-[var(--input-glass)] font-bold text-[var(--foreground)]/60 text-sm tracking-wide uppercase flex items-center gap-2 shrink-0">
                      <FileSearch size={16} /> Original Resume
                    </div>
                    <div className="p-6 md:p-8 flex-1 font-['Fira_Code',monospace] text-sm text-[var(--foreground)]/80 leading-loose bg-red-500/5 dark:bg-red-500/10 whitespace-pre-wrap">
                      {`• Responsible for building web components using React.
• Helped the backend team with API integrations.
• Improved website speed.
• Worked with other developers to fix bugs.`}
                    </div>
                  </div>

                  <div
                    className="flex-1 flex flex-col border rounded-3xl overflow-hidden shadow-md"
                    style={{
                      borderColor: `var(--color-box${activeModal.boxId}-bg)`,
                    }}
                  >
                    <div
                      className="px-6 py-4 border-b font-bold text-sm tracking-wide uppercase flex items-center gap-2 shrink-0"
                      style={{
                        backgroundColor: `var(--color-box${activeModal.boxId}-bg)`,
                        color: `var(--color-box${activeModal.boxId}-text)`,
                        borderColor: `var(--color-box${activeModal.boxId}-border)`,
                      }}
                    >
                      <Sparkles size={16} /> AI Optimized
                    </div>
                    <div
                      className="p-6 md:p-8 flex-1 flex flex-col font-medium text-[15px] leading-relaxed"
                      style={{
                        backgroundColor: `var(--color-box${activeModal.boxId}-icon-bg)`,
                        color: "var(--foreground)",
                      }}
                    >
                      <ul className="space-y-4 list-disc pl-5 marker:text-[var(--primary)] mb-10">
                        <li>
                          <span className="font-bold">Architected</span> highly
                          reusable UI components using React and TypeScript,
                          accelerating front-end development cycles by 25%.
                        </li>
                        <li>
                          <span className="font-bold">Spearheaded</span> RESTful
                          API integrations in collaboration with backend
                          engineering, ensuring robust data pipelines.
                        </li>
                        <li>
                          <span className="font-bold">Optimized</span> core web
                          vitals, reducing LCP (Largest Contentful Paint) by 1.2
                          seconds through lazy loading and asset minification.
                        </li>
                        <li>
                          <span className="font-bold">Resolved</span> 50+
                          critical production bugs in cross-functional agile
                          sprints, improving application stability by 15%.
                        </li>
                      </ul>

                      <div className="mt-auto flex justify-end shrink-0">
                        <button
                          className="px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform bg-[var(--foreground)] text-[var(--background)]"
                          onClick={() => {
                            const toast = document.getElementById("dash-toast");
                            toast.style.opacity = "1";
                            setActiveModal(null);
                            setTimeout(() => (toast.style.opacity = "0"), 3000);
                          }}
                        >
                          <Check size={18} /> Apply Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[var(--card-solid)] border border-[var(--border)] px-4 py-2 rounded-full shadow-lg opacity-0 pointer-events-none transition-opacity duration-300 z-[110]"
          id="dash-toast"
        >
          <CheckCircle2 size={16} className="text-green-500" />
          <span className="text-sm font-bold">
            Changes applied to your resume!
          </span>
        </div>
      </div>
    </>
  );
}
