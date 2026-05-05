import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  MapPin, 
  Bell, 
  User, 
  Plus, 
  AlertCircle, 
  History, 
  Settings, 
  ChevronRight,
  Info,
  Navigation,
  ArrowRight,
  CheckCircle2,
  Phone,
  LayoutDashboard,
  Sparkles,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Eye,
  Activity,
  FileText
} from 'lucide-react';
import React, { useState, useEffect, useMemo } from 'react';
import { cn } from './lib/utils';
import { Incident } from './types.ts';
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// --- UTILS ---

const useTheme = () => {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return { isDark, toggle: () => setIsDark(!isDark) };
};

// --- COMPONENTS ---

const ThemeToggle = ({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) => (
  <button 
    onClick={onToggle}
    className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-sm"
  >
    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
  </button>
);

const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success' | 'outline' }) => {
  const variants = {
    primary: 'safe-gradient text-white shadow-lg shadow-indigo-500/20',
    secondary: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800',
    danger: 'bg-red-500 text-white shadow-lg shadow-red-500/20',
    success: 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20',
    ghost: 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
    outline: 'bg-transparent border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        'px-6 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all', className)}>
    {children}
  </div>
);

const Input = ({ label, icon: Icon, ...props }: any) => (
  <div className="space-y-2 w-full">
    {label && <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1 uppercase tracking-widest">{label}</label>}
    <div className="relative group">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />}
      <input 
        className={cn(
          "w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl py-4 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500",
          Icon ? "pl-12 pr-4" : "px-4"
        )}
        {...props}
      />
    </div>
  </div>
);

// --- NAVIGATION ---

const Sidebar = ({ current, setView, isDark, toggleTheme }: any) => {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'staff', label: 'Staff Hub', icon: Shield },
  ];

  return (
    <div className="hidden lg:flex w-72 h-screen flex-col bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-900 sticky top-0 p-8 space-y-10 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 safe-gradient rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-black dark:text-white tracking-tighter">Safe Space</h2>
      </div>

      <nav className="flex-1 space-y-2">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => setView(item.id === 'staff' ? 'admin' : item.id === 'reports' ? 'dashboard' : item.id)}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all group",
              current === item.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="pt-6 border-t border-slate-100 dark:border-slate-900 space-y-4">
        <div className="flex items-center justify-between px-4">
          <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Theme</span>
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </div>
        <button className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white group">
          <Settings className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </button>
        <div className="flex items-center gap-3 px-4 pt-4">
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black dark:text-white truncate">Kavin Nilavu</p>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Premium Safe</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SCREENS ---

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 safe-gradient flex flex-col items-center justify-center text-white z-[100]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        <div className="w-32 h-32 bg-white/20 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center shadow-2xl relative overflow-hidden">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute inset-0 bg-white/10" 
          />
          <Shield className="w-16 h-16 text-white relative z-10" />
        </div>
        <div className="text-center space-y-2">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-black tracking-tight"
          >
            Safe Space AI
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/70 text-xl font-medium italic"
          >
            “Your Voice Matters”
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

const Dashboard = ({ onReport, onSOS, onAdmin }: any) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    fetch('/api/incidents')
      .then(res => res.json())
      .then(setIncidents);
  }, []);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-8 lg:p-12 space-y-10">
      {/* Top Banner / Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative h-full">
           <Card className="h-full bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white p-8 sm:p-12 border-none relative overflow-hidden flex flex-col justify-between group">
            <Sparkles className="absolute -right-12 -top-12 w-64 h-64 text-white/5 rotate-12 transition-transform duration-700 group-hover:scale-110" />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">AI Intelligence Active</div>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="space-y-4 max-w-xl">
                <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight">Stay protected in real-time, anywhere.</h1>
                <p className="text-white/70 text-lg font-medium leading-relaxed">Our AI monitors local incident patterns to provide you with smart safety insights and instant emergency response.</p>
              </div>
            </div>
            <div className="relative z-10 pt-10 flex flex-wrap gap-4">
              <Button onClick={onSOS} className="bg-white text-indigo-700 hover:bg-slate-50 border-none px-8 py-4 shadow-xl">
                <AlertCircle className="w-5 h-5" /> Activate SOS
              </Button>
              <Button onClick={onReport} className="bg-indigo-500 text-white border-white/20 backdrop-blur-md px-8 py-4">
                <Plus className="w-5 h-5" /> Submit Report
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-900 border-none shadow-xl">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-black dark:text-white">Emergency Only</h3>
            <p className="text-slate-400 text-sm mt-1 px-4 leading-relaxed">Use the SOS pulse for real immediate danger.</p>
          </Card>
          
          <Card className="p-8 bg-indigo-50 dark:bg-indigo-900/20 border-none shadow-xl">
            <div className="flex items-center gap-4 mb-4">
               <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Nearest Safe Point</p>
                <p className="font-bold dark:text-white">Central Police HQ</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Approximately 0.4 miles away. ETA: 4 mins by foot.</p>
            <Button variant="ghost" className="w-full mt-6 text-indigo-600 dark:text-indigo-400 font-black italic">
              View Route <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Card>
        </div>
      </section>

      {/* Bento Grid Stats & Categories */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 lg:row-span-2 flex flex-col justify-between group overflow-hidden relative">
          <Search className="absolute -right-4 -bottom-4 w-24 h-24 text-slate-50 dark:text-slate-900 group-hover:scale-110 transition-transform" />
          <div className="relative z-10 space-y-4">
             <h4 className="text-sm font-black uppercase tracking-widest text-slate-400">Activity Level</h4>
             <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black dark:text-white">Low</span>
                <span className="text-emerald-500 font-black uppercase text-[10px] tracking-widest">Safe Area</span>
             </div>
             <div className="flex gap-1 h-12 items-end">
                {[4,6,3,8,4,9,2,6,4,7].map((h, i) => (
                  <div key={i} style={{ height: `${h * 10}%` }} className="flex-1 bg-indigo-100 dark:bg-indigo-900/40 rounded-t-sm" />
                ))}
             </div>
          </div>
          <p className="text-xs text-slate-400 font-medium relative z-10">Last updated: 5 mins ago</p>
        </Card>

        <Card className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 p-6 flex items-center justify-between border-none">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Local Alerts</p>
            <p className="text-2xl font-black mt-1">12 Active</p>
          </div>
          <Bell className="w-10 h-10 opacity-20" />
        </Card>

        <Card className="p-6 flex items-center justify-between border-none shadow-md">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Safety</p>
            <p className="text-2xl font-black dark:text-white mt-1">98% Score</p>
          </div>
          <Shield className="w-10 h-10 text-emerald-500/20" />
        </Card>

        <Card className="p-6 flex items-center justify-between border-none shadow-md bg-indigo-600 text-white">
           <div className="space-y-1">
            <p className="text-xs font-bold leading-tight">Staff members are currently patrolling your sector.</p>
           </div>
           <User className="w-10 h-10 opacity-30" />
        </Card>
      </section>

      {/* Recent Activity List */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
           <div className="space-y-1">
            <h2 className="text-3xl font-black dark:text-white tracking-tight">Recent Signals</h2>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Public transparency board</p>
           </div>
           <Button variant="outline" className="px-5 py-2 text-xs">Filter Map</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {incidents.map((incident) => (
            <Card key={incident.id} className="group hover:ring-2 hover:ring-indigo-500/20 shadow-lg border-none p-8 flex flex-col justify-between gap-6 transition-all">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-indigo-600" />
                  </div>
                  <span className={cn(
                    "text-[10px] uppercase tracking-widest font-black px-3 py-1.5 rounded-xl shadow-sm",
                    incident.status === 'Resolved' ? "bg-green-50 text-green-700" : 
                    incident.status === 'In Progress' ? "bg-blue-50 text-blue-700" : 
                    "bg-yellow-50 text-yellow-700"
                  )}>
                    {incident.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black dark:text-white leading-tight group-hover:text-indigo-600 transition-colors">{incident.title}</h3>
                  <p className="text-sm text-slate-400 font-black uppercase tracking-widest">{incident.category}</p>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-md leading-relaxed line-clamp-2 italic">“{incident.description}”</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-widest">{incident.location}</span>
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-300">2h ago</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

const ReportScreen = ({ onBack, onSubmit, data, setData }: any) => {
  const [step, setStep] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);
  const categories = [
    { label: 'Harassment', icon: User },
    { label: 'Theft', icon: Shield },
    { label: 'Vandalism', icon: AlertCircle },
    { label: 'Medical Emergency', icon: Plus },
    { label: 'Suspicious Activity', icon: Info },
    { label: 'Other', icon: AlertCircle },
  ];

  const handleAIAnalyze = async () => {
    if (data.description.length < 10) return;
    setAnalyzing(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              category: { type: "string" },
              summary: { type: "string" }
            }
          }
        },
        contents: `Analyze this safety incident description and suggest one of these categories: ${categories.map(c => c.label).join(', ')}. Also provide a short 3-5 word summary title. Description: ${data.description}`
      });
      
      const result = JSON.parse(response.text);
      if (result.category) {
        setData({ category: result.category, title: result.summary || data.title });
        setStep(2);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col lg:flex-row">
      <div className="lg:w-1/2 safe-gradient p-12 lg:p-24 flex flex-col justify-between text-white overflow-hidden relative">
        <Shield className="absolute -left-20 -bottom-20 w-[40rem] h-[40rem] text-white/5 opacity-10" />
        <div className="relative z-10 space-y-6">
          <button onClick={onBack} className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all">
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <div className="space-y-4">
             <h1 className="text-5xl font-black tracking-tight leading-tight">Break the <br/>silence safely.</h1>
             <p className="text-white/70 text-xl max-w-md">Your reports are 100% anonymous and used only to keep the community safe.</p>
          </div>
        </div>
        
        <div className="relative z-10 space-y-8">
           <div className="flex gap-3">
             {[1, 2, 3].map(s => (
               <div key={s} className={cn(
                 "h-1.5 rounded-full transition-all duration-500",
                 step >= s ? "w-12 bg-white" : "w-6 bg-white/20"
               )} />
             ))}
           </div>
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl">
                 <Shield className="w-6 h-6" />
              </div>
              <p className="text-sm font-black uppercase tracking-widest text-white/60">Fully Encrypted System</p>
           </div>
        </div>
      </div>

      <div className="flex-1 p-8 sm:p-12 lg:p-24 bg-white dark:bg-slate-950 overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-10 max-w-2xl">
              <div className="space-y-3">
                <h2 className="text-4xl font-black dark:text-white">Step 1: The Details</h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg">Describe exactly what you witnessed. AI will help categorize it for you.</p>
              </div>
              
              <div className="space-y-6">
                 <textarea 
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-[2rem] p-8 h-80 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 text-xl resize-none italic"
                  placeholder="Today at 4 PM, I noticed someone following multiple people near..."
                  value={data.description}
                  onChange={(e) => setData({ description: e.target.value })}
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-16 text-lg"
                    onClick={handleAIAnalyze}
                    disabled={analyzing || data.description.length < 10}
                  >
                    {analyzing ? <div className="w-6 h-6 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" /> : <Sparkles className="w-6 h-6" />}
                    Analyze with AI
                  </Button>
                  <Button className="h-16 text-lg" onClick={() => setStep(2)}>
                    Next Step <ArrowRight className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-10 max-w-2xl">
              <div className="space-y-3">
                <h2 className="text-4xl font-black dark:text-white">Step 2: Category</h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg">How would you classify this event?</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <button 
                    key={cat.label}
                    onClick={() => {
                      setData({ category: cat.label });
                      setStep(3);
                    }}
                    className={cn(
                      "p-8 bg-white dark:bg-slate-900 border-2 rounded-[2.5rem] flex flex-col items-center gap-4 transition-all group",
                      data.category === cat.label ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20 shadow-xl" : "border-slate-100 dark:border-slate-800 hover:border-indigo-200"
                    )}
                  >
                    <cat.icon className={cn(
                      "w-10 h-10 transition-colors duration-300",
                      data.category === cat.label ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-600"
                    )} />
                    <span className={cn(
                      "text-lg font-black transition-colors duration-300",
                      data.category === cat.label ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400 group-hover:text-slate-900"
                    )}>{cat.label}</span>
                  </button>
                ))}
              </div>
              <Button variant="ghost" className="w-full h-14" onClick={() => setStep(1)}>Go Back</Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-10 max-w-2xl">
              <div className="space-y-3">
                <h2 className="text-4xl font-black dark:text-white">Final: Location</h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg">Where did the incident occur?</p>
              </div>
              
              <div className="space-y-8">
                 <div className="w-full aspect-video bg-slate-50 dark:bg-slate-900 rounded-[3rem] flex flex-col items-center justify-center border-3 border-dashed border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:border-indigo-400 transition-all cursor-pointer">
                    <Navigation className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4 group-hover:text-indigo-500 transition-colors" />
                    <span className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-sm text-center px-8">Tap here to pick from map interactively</span>
                 </div>
                 
                 <Input 
                  label="Manual Address Input" 
                  placeholder="e.g. 123 Main St, Sector 4..." 
                  value={data.location} 
                  onChange={(e: any) => setData({ location: e.target.value })} 
                />

                 <div className="grid grid-cols-2 gap-4">
                    <Button variant="ghost" className="h-16" onClick={() => setStep(2)}>Previous</Button>
                    <Button className="h-16 text-xl" onClick={onSubmit}>
                      Submit Signal <CheckCircle2 className="w-6 h-6" />
                    </Button>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SOSScreen = ({ onBack }: any) => {
  const [state, setState] = useState<'idle' | 'counting' | 'triggered' | 'cancelled'>('idle');
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    let interval: any;
    if (state === 'counting' && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0 && state === 'counting') {
      setState('triggered');
    }
    return () => clearInterval(interval);
  }, [state, timer]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 sm:p-24 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.15),transparent_70%)] pointer-events-none" />
      
      <div className="absolute top-12 left-12 md:left-24 z-50">
        <button onClick={onBack} className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10 hover:bg-white/20 transition-all">
          <ChevronRight className="w-7 h-7 rotate-180 text-white" />
        </button>
      </div>

      <div className="flex flex-col items-center gap-12 sm:gap-20 relative z-10 w-full max-w-3xl">
        <AnimatePresence mode="wait">
          {state === 'triggered' ? (
             <motion.div key="win" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-12">
                <div className="w-64 h-64 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_120px_rgba(16,185,129,0.5)] mx-auto relative group">
                  <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-emerald-500 rounded-full opacity-30" />
                  <CheckCircle2 className="w-32 h-32 text-white" />
                </div>
                <div className="space-y-6">
                  <h2 className="text-6xl font-black text-white italic tracking-tighter">Help Dispatched</h2>
                  <p className="text-white/60 text-2xl max-w-xl mx-auto leading-relaxed">Tactical response teams are en route to your current beacon point.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button variant="success" className="h-20 px-12 text-2xl"><Phone className="w-7 h-7" /> Call HQ</Button>
                  <Button variant="ghost" onClick={onBack} className="h-20 px-12 text-2xl text-white hover:bg-white/10 italic">Close Connection</Button>
                </div>
             </motion.div>
          ) : (
            <motion.div key="active" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-16">
              <div className="space-y-4">
                <h2 className="text-5xl sm:text-7xl font-black text-white italic tracking-tighter">
                   {state === 'counting' ? `LOCKING IN ${timer}S` : state === 'cancelled' ? "SYSTEM RESET" : "PULSE TRIGGER"}
                </h2>
                <p className="text-white/40 text-xl font-bold uppercase tracking-[0.3em]">
                   {state === 'counting' ? "HOLD SCREEN TO SILENCE" : "TAP TO SEND COORDINATES"}
                </p>
              </div>

              <div className="relative">
                <AnimatePresence>
                  {state === 'counting' && (
                    <>
                      <motion.div initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: 3, opacity: 0 }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 bg-red-600 rounded-full" />
                      <motion.div initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: 2, opacity: 0 }} transition={{ repeat: Infinity, duration: 1, delay: 0.5 }} className="absolute inset-0 bg-red-600 rounded-full" />
                    </>
                  )}
                </AnimatePresence>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (state === 'counting') setState('cancelled');
                    else setState('counting');
                  }}
                  className={cn(
                    "relative w-80 h-80 sm:w-96 sm:h-96 rounded-full flex flex-col items-center justify-center transition-all duration-700 shadow-2xl overflow-hidden",
                    state === 'counting' ? "bg-white text-red-600 shadow-white/20" : state === 'cancelled' ? "bg-slate-900 border-4 border-slate-800 text-slate-500" : "bg-red-600 text-white shadow-red-600/40"
                  )}
                >
                   {state === 'counting' ? (
                     <div className="flex flex-col items-center">
                        <AlertCircle className="w-24 h-24 mb-4" />
                        <span className="text-4xl font-black italic tracking-tighter uppercase">Abort</span>
                     </div>
                   ) : (
                     <div className="flex flex-col items-center">
                        <Shield className={cn("w-24 h-24 mb-4 transition-all duration-700", state === 'cancelled' ? "scale-75 opacity-30 blur-sm" : "scale-100")} />
                        <span className="text-6xl font-black italic tracking-tighter uppercase">{state === 'cancelled' ? "Off" : "SOS"}</span>
                     </div>
                   )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Emergency Lines */}
      <div className="fixed bottom-12 inset-x-12 sm:inset-x-24 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
         <button className="flex items-center justify-center gap-4 bg-white/5 border border-white/10 p-8 rounded-[3rem] group hover:bg-white/10 transition-all">
            <span className="text-4xl font-black text-white italic group-hover:text-red-400">911</span>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Local Police</p>
              <p className="text-sm font-bold text-white/60">Call Dispatch</p>
            </div>
         </button>
         <button className="flex items-center justify-center gap-4 bg-white/5 border border-white/10 p-8 rounded-[3rem] group hover:bg-white/10 transition-all">
            <span className="text-4xl font-black text-white italic group-hover:text-red-400">112</span>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Universal Help</p>
              <p className="text-sm font-bold text-white/60">Connect Line</p>
            </div>
         </button>
      </div>
    </div>
  );
};

// --- AUTH & ONBOARDING ---

const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const slides = [
    {
      title: "Anonymity First",
      desc: "Report incidents without revealing your identity. We prioritize your privacy above all.",
      icon: Shield,
      color: "indigo"
    },
    {
      title: "Instant SOS",
      desc: "Trigger emergency alerts with a single tap. Your safety net is always active.",
      icon: Bell,
      color: "red"
    },
    {
      title: "AI Analysis",
      desc: "Our AI helps categorize and prioritize reports to ensure faster response times.",
      icon: Sparkles,
      color: "purple"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col lg:flex-row overflow-hidden">
      <div className="lg:w-1/2 safe-gradient p-12 lg:p-24 flex flex-col justify-center items-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="relative z-10 w-full max-w-sm aspect-square bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/20 flex items-center justify-center shadow-2xl"
          >
            {React.createElement(slides[step].icon, { className: "w-32 h-32 text-white" })}
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-white/5 mix-blend-overlay opacity-20 pointer-events-none" />
      </div>

      <div className="flex-1 p-12 lg:p-24 flex flex-col justify-between">
        <div className="space-y-12">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  step === i ? "w-12 bg-indigo-600" : "w-4 bg-slate-200 dark:bg-slate-800"
                )} 
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6 max-w-md"
            >
              <h2 className="text-6xl font-black dark:text-white tracking-tight leading-none">{slides[step].title}</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xl font-medium leading-relaxed">{slides[step].desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="pt-12">
          <Button 
            className="w-full lg:w-auto px-12 py-5 text-xl h-20"
            onClick={() => step < slides.length - 1 ? setStep(s => s + 1) : onComplete()}
          >
            {step === slides.length - 1 ? "Initialize Safe Space" : "Next Discovery"}
            <ArrowRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const AuthScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col lg:flex-row overflow-hidden font-sans">
      <div className="hidden lg:flex lg:w-3/5 safe-gradient p-24 flex-col justify-between text-white relative">
        <div className="relative z-10 space-y-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl">
             <Shield className="w-7 h-7" />
          </div>
          <h2 className="text-6xl font-black italic tracking-tighter">Secure. <br/>Anonymous. <br/>AI-Driven.</h2>
        </div>
        <p className="relative z-10 text-white/50 font-black uppercase tracking-[0.4em] text-xs">Standardized Safety Protocol v2.5</p>
        <Shield className="absolute -right-20 -bottom-20 w-[40rem] h-[40rem] text-white/5 opacity-10" />
      </div>

      <div className="flex-1 p-12 lg:p-24 flex flex-col justify-center items-center bg-white dark:bg-slate-950 relative">
        <div className="w-full max-w-sm space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-black dark:text-white tracking-tight">{isLogin ? "Welcome Back" : "Create Shield"}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">{isLogin ? "Resume your safety monitoring." : "Join the encrypted community net."}</p>
          </div>

          <div className="space-y-6">
            <Input label="Identity Pin / Email" icon={User} placeholder="kavin.nilavu@secure.hub" />
            <Input label="Access Key" icon={Shield} type="password" placeholder="••••••••" />
          </div>

          <div className="space-y-6">
            <Button className="w-full py-5 text-xl h-20" onClick={onLogin}>
              {isLogin ? "Authenticate" : "Register Credentials"}
            </Button>
            <Button variant="ghost" className="w-full py-5 text-slate-400 font-bold tracking-widest uppercase text-xs" onClick={onLogin}>
              Access as Anonymous Ghost
            </Button>
          </div>

          <p className="text-center text-slate-500 dark:text-slate-400 pt-10 font-bold">
            {isLogin ? "New user?" : "Existing operative?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-indigo-600 dark:text-indigo-400 font-black hover:underline underline-offset-4"
            >
              {isLogin ? "Request Access" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [view, setView] = useState<'splash' | 'onboarding' | 'auth' | 'dashboard' | 'report' | 'sos' | 'admin'>('splash');
  const [reportData, setReportData] = useState({ title: '', description: '', category: 'Other', location: 'Downtown' });
  const { isDark, toggle: toggleTheme } = useTheme();

  const handleSplashComplete = () => setView('onboarding');
  const handleOnboardingComplete = () => setView('auth');
  const handleLogin = () => setView('dashboard');
  const handleReport = () => setView('report');
  const handleSOS = () => setView('sos');
  const handleBack = () => setView('dashboard');

  const submitReport = async () => {
    try {
      await fetch('/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...reportData,
          title: reportData.title || (reportData.description.slice(0, 30) + '...'),
          anonymous: true
        })
      });
      setReportData({ title: '', description: '', category: 'Other', location: 'Downtown' });
      handleBack();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans transition-colors duration-300 selection:bg-indigo-100 selection:text-indigo-900">
      <AnimatePresence mode="wait">
        {view === 'splash' && <SplashScreen key="splash" onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {/* Main Layout Container */}
      {(view !== 'splash' && view !== 'onboarding' && view !== 'auth' && view !== 'report' && view !== 'sos') && (
        <Sidebar current={view === 'admin' ? 'staff' : view} setView={setView} isDark={isDark} toggleTheme={toggleTheme} />
      )}

      <main className={cn(
        "flex-1 flex flex-col min-h-screen relative overflow-hidden",
        (view === 'report' || view === 'sos') ? "w-full" : ""
      )}>
        {/* Mobile Header (Hidden on Desktop) */}
        {(view === 'dashboard' || view === 'admin') && (
          <header className="lg:hidden p-6 flex justify-between items-center bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 z-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 safe-gradient rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-black dark:text-white tracking-tighter">Safe Space</h2>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                 <User className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </header>
        )}

        <AnimatePresence mode="wait">
          {view === 'onboarding' && <Onboarding key="onboarding" onComplete={handleOnboardingComplete} />}
          {view === 'auth' && <AuthScreen key="auth" onLogin={handleLogin} />}
          {view === 'dashboard' && <Dashboard key="dashboard" onReport={handleReport} onSOS={handleSOS} onAdmin={() => setView('admin')} />}
          {view === 'report' && <ReportScreen key="report" onBack={handleBack} onSubmit={submitReport} data={reportData} setData={(d: any) => setReportData(p => ({ ...p, ...d }))} />}
          {view === 'sos' && <SOSScreen key="sos" onBack={handleBack} />}
          {view === 'admin' && (
            <div className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-12 space-y-12">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <h1 className="text-5xl font-black dark:text-white tracking-tight">Staff Command</h1>
                    <p className="text-slate-400 font-medium uppercase tracking-[0.2em] text-xs">Sector 09 Headquarters</p>
                  </div>
                  <Button variant="outline" className="h-14 px-8" onClick={() => setView('dashboard')}>Return to Public View</Button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-indigo-600 border-none p-10 text-white flex flex-col justify-between h-48 shadow-2xl">
                     <p className="text-white/40 text-[10px] uppercase font-black tracking-widest">Active Units</p>
                     <p className="text-6xl font-black">24</p>
                  </Card>
                  <Card className="bg-slate-900 dark:bg-white dark:text-slate-950 p-10 text-white flex flex-col justify-between h-48 shadow-xl border-none">
                     <p className="opacity-30 text-[10px] uppercase font-black tracking-widest">Open Signals</p>
                     <p className="text-6xl font-black">08</p>
                  </Card>
                  <Card className="bg-emerald-500 border-none p-10 text-white flex flex-col justify-between h-48 shadow-xl">
                     <p className="text-white/40 text-[10px] uppercase font-black tracking-widest">Resolved Today</p>
                     <p className="text-6xl font-black">156</p>
                  </Card>
               </div>

               <div className="space-y-6">
                  <h3 className="text-2xl font-black dark:text-white">Active Dispatch Stream</h3>
                  <div className="space-y-4">
                     <Card className="p-8 border-none shadow-md hover:ring-2 hover:ring-indigo-500/20 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="space-y-3">
                           <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                              <span className="text-[10px] font-black uppercase text-red-500 tracking-widest">Critical Alert</span>
                              <span className="text-slate-400 text-xs font-bold">2 mins ago @ Terminal 4</span>
                           </div>
                           <h4 className="text-2xl font-black dark:text-white italic">“Multiple suspicious individuals observed near zone...”</h4>
                        </div>
                        <div className="flex gap-2">
                           <Button variant="secondary" className="px-10 h-14">Shadow View</Button>
                           <Button className="px-10 h-14">Intervene Now</Button>
                        </div>
                     </Card>
                  </div>
               </div>
            </div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation (Hidden on Desktop) */}
        {(view === 'dashboard' || view === 'admin') && (
          <nav className="lg:hidden fixed bottom-6 inset-x-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-4 flex justify-between items-center shadow-2xl z-50">
            <button 
              onClick={() => setView('dashboard')}
              className={cn("p-4 rounded-2xl transition-all", view === 'dashboard' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "text-slate-400")}
            >
              <LayoutDashboard className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setView('admin')}
              className={cn("p-4 rounded-2xl transition-all", view === 'admin' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "text-slate-400")}
            >
              <Shield className="w-6 h-6" />
            </button>
            <button onClick={handleSOS} className="w-14 h-14 safe-gradient rounded-full flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 active:scale-90 transition-transform">
               <AlertCircle className="w-7 h-7" />
            </button>
            <button className="p-4 text-slate-400"><History className="w-6 h-6" /></button>
            <button className="p-4 text-slate-400"><Settings className="w-6 h-6" /></button>
          </nav>
        )}
      </main>
    </div>
  );
}
