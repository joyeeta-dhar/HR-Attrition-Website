import { motion } from 'framer-motion';

export default function MeshBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-background pointer-events-none">
      {/* Background Gradient Mesh */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-accent/20 blur-[140px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] rounded-full bg-secondary/15 blur-[100px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
      
      {/* Floating Particles/Bubbles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5 backdrop-blur-xs border border-white/5"
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%', 
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.2 + 0.05
          }}
          animate={{
            y: [null, '-20%', '20%', '0%'],
            x: [null, '10%', '-10%', '0%'],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            width: Math.random() * 100 + 50 + 'px',
            height: Math.random() * 100 + 50 + 'px',
          }}
        />
      ))}

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
    </div>
  );
}
