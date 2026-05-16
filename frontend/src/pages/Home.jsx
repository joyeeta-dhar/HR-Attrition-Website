import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, BarChart3, Database, BrainCircuit, CheckSquare, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

export default function Home() {
  return (
    <div className="w-full bg-white">

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">

        {/* Very subtle background detail */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(234,88,12,0.07) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        {/* Bottom fade to sections */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', zIndex: 0,
          background: 'linear-gradient(to bottom, transparent, #f8fafc)',
          pointerEvents: 'none',
        }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">

          {/* Eyebrow label */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(234,88,12,0.08)', border: '1px solid rgba(234,88,12,0.2)',
              color: '#ea580c', borderRadius: '999px', padding: '5px 14px',
              fontSize: '13px', fontWeight: 600, letterSpacing: '0.02em', marginBottom: '28px',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ea580c', display: 'inline-block' }} />
              Powered by Machine Learning
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontWeight: 800,
              lineHeight: 1.1, letterSpacing: '-0.03em', color: '#0f172a',
              marginBottom: '24px',
            }}
          >
            Know who's leaving<br />
            <span style={{ color: '#ea580c' }}>before they do.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontSize: '1.2rem', color: '#64748b', maxWidth: '560px',
              margin: '0 auto 40px', lineHeight: 1.7, fontWeight: 400,
            }}
          >
            Identify at-risk employees with precision. Stop turnover before it starts — with a single prediction.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}
          >
            <Link to="/register" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#0f172a', color: '#fff', padding: '14px 28px',
              borderRadius: '10px', fontWeight: 700, fontSize: '1rem',
              textDecoration: 'none', transition: 'background 0.2s',
              boxShadow: '0 4px 24px rgba(15,23,42,0.18)',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#1e293b'}
              onMouseLeave={e => e.currentTarget.style.background = '#0f172a'}
            >
              Get started free <ArrowRight size={17} />
            </Link>
            <a href="#features" style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              background: 'transparent', color: '#0f172a', padding: '14px 24px',
              borderRadius: '10px', fontWeight: 600, fontSize: '1rem',
              textDecoration: 'none', border: '1.5px solid #e2e8f0',
              transition: 'border-color 0.2s, color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#94a3b8'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
            >
              See how it works <ChevronRight size={16} />
            </a>
          </motion.div>

          {/* Social proof bar */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ marginTop: '52px', color: '#94a3b8', fontSize: '13px', fontWeight: 500 }}
          >
            Trusted by HR teams · Trained on IBM HR Analytics · No credit card required
          </motion.p>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ background: '#f8fafc', padding: '100px 24px', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: '64px' }}
          >
            <p style={{ color: '#ea580c', fontWeight: 600, fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Built for HR teams
            </p>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
              Everything you need to<br />reduce attrition
            </h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}
          >
            {[
              {
                icon: <Zap size={22} />, color: '#ea580c', bg: 'rgba(234,88,12,0.08)',
                title: 'Instant Predictions',
                desc: 'Get real-time attrition risk scores using a trained Random Forest model. Results in under a second.',
              },
              {
                icon: <ShieldCheck size={22} />, color: '#16a34a', bg: 'rgba(22,163,74,0.08)',
                title: 'Enterprise Security',
                desc: 'JWT authentication, bcrypt hashing and encrypted data pipelines keep your HR data private.',
              },
              {
                icon: <BarChart3 size={22} />, color: '#2563eb', bg: 'rgba(37,99,235,0.08)',
                title: 'Analytics Dashboard',
                desc: 'Visual charts, prediction history and risk distribution — all in one clean dashboard.',
              },
            ].map(({ icon, color, bg, title, desc }) => (
              <motion.div key={title} variants={fadeUp} style={{
                background: '#fff', borderRadius: '16px', padding: '32px',
                border: '1px solid #f1f5f9',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
                transition: 'box-shadow 0.25s, transform 0.25s',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.10)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px', background: bg,
                  color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  {icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a', marginBottom: '10px' }}>{title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.65, fontSize: '0.95rem' }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: '100px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: '72px' }}
          >
            <p style={{ color: '#ea580c', fontWeight: 600, fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Simple process
            </p>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em' }}>
              Three steps to clarity
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              {
                num: '01', icon: <Database size={20} />,
                title: 'Input employee data',
                desc: 'Fill in key HR metrics — department, satisfaction scores, tenure, salary band and more through our secure portal.',
              },
              {
                num: '02', icon: <BrainCircuit size={20} />,
                title: 'AI runs the analysis',
                desc: 'Our ML pipeline scales, encodes and passes the data through a calibrated classifier trained on 1,400+ employee records.',
              },
              {
                num: '03', icon: <CheckSquare size={20} />,
                title: 'Take targeted action',
                desc: 'Receive a clear Low / High risk verdict with a probability score. Act before their resignation hits your desk.',
              },
            ].map(({ num, icon, title, desc }, i) => (
              <motion.div
                key={num}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
                style={{
                  display: 'flex', gap: '32px', alignItems: 'flex-start',
                  padding: '40px 0',
                  borderBottom: i < 2 ? '1px solid #f1f5f9' : 'none',
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '14px',
                    background: '#0f172a', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(15,23,42,0.18)',
                  }}>
                    {icon}
                  </div>
                </div>
                <div>
                  <p style={{ color: '#ea580c', fontWeight: 700, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Step {num}</p>
                  <h3 style={{ fontWeight: 700, fontSize: '1.2rem', color: '#0f172a', marginBottom: '10px' }}>{title}</h3>
                  <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '0.97rem', maxWidth: '520px' }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#0f172a', padding: '100px 24px' }}>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}
        >
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff',
            letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: '20px',
          }}>
            Ready to stop the<br />
            <span style={{ color: '#ea580c' }}>talent drain?</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '40px' }}>
            Join HR teams using data — not gut feel — to build stronger, longer-lasting organizations.
          </p>
          <Link to="/register" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#ea580c', color: '#fff', padding: '15px 32px',
            borderRadius: '10px', fontWeight: 700, fontSize: '1.05rem',
            textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(234,88,12,0.35)',
            transition: 'background 0.2s, transform 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c2410c'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#ea580c'; e.currentTarget.style.transform = 'none'; }}
          >
            Create free account <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
