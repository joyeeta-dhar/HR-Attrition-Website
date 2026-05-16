import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, BarChart3, Database, BrainCircuit, CheckSquare, Users, TrendingUp, HeartPulse } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function Home() {
  return (
    <div className="w-full">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto text-center z-10"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-slate-300">Intelligent HR Analytics Platform</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants} 
            className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6"
          >
            Predict Retention.<br />
            <span className="text-gradient">Empower Talent.</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
          >
            Leverage advanced AI to identify flight risks before they happen. Build a resilient workforce with data-driven insights.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-24">
            <Link to="/register" className="btn-premium group">
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="btn-premium-outline">
              Live Demo
            </Link>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            {[
              { icon: <TrendingUp className="text-primary" />, label: "Accuracy", value: "94.2%" },
              { icon: <Users className="text-secondary" />, label: "Employees", value: "1.4k+" },
              { icon: <Zap className="text-accent" />, label: "Response", value: "<1s" },
              { icon: <HeartPulse className="text-alert" />, label: "Retention", value: "+18%" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.06)' }}
                className="glass-card-neon p-6 text-center"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Cutting-Edge Features</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Enterprise-grade tools for modern HR departments.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Predictive Intelligence",
                desc: "Real-time attrition forecasting powered by Random Forest regression models.",
                color: "from-primary/20 to-primary/5"
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Ironclad Security",
                desc: "Enterprise-level JWT auth and bcrypt encryption ensuring complete data privacy.",
                color: "from-secondary/20 to-secondary/5"
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Deep Analytics",
                desc: "Comprehensive vizualization of organizational health and risk distribution.",
                color: "from-accent/20 to-accent/5"
              }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card-neon p-8 group border-t-2 ${i === 0 ? 'border-primary' : i === 1 ? 'border-secondary' : 'border-accent'}`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-32 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Simple Integration</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Three steps to organizational clarity.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 relative">
             {/* Connector line for desktop */}
            <div className="hidden md:block absolute top-[20%] left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
            
            {[
              { icon: <Database />, title: "Input Data", desc: "Securely upload employee metrics." },
              { icon: <BrainCircuit />, title: "AI Analysis", desc: "Real-time ML classification." },
              { icon: <CheckSquare />, title: "Take Action", desc: "Implement retention strategies." }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10"
              >
                <div className="w-20 h-20 rounded-full bg-slate-900 border-2 border-white/10 flex items-center justify-center mx-auto mb-8 shadow-2xl relative group overflow-hidden">
                   <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                   <div className="relative z-10 text-white group-hover:text-primary transition-colors duration-300">{step.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-500 font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-neon p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to secure your future?</h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">Join the next generation of HR excellence today.</p>
            <Link to="/register" className="btn-premium inline-flex py-4 px-12 text-lg">
              Get Started for Free
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
