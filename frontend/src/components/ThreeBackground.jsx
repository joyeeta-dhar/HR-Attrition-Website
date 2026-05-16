export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Animated gradient mesh background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0f172a 100%)',
        }}
      />
      {/* Glowing orb top-right */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(234,88,12,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'pulse-slow 6s ease-in-out infinite',
        }}
      />
      {/* Glowing orb bottom-left */}
      <div
        style={{
          position: 'absolute',
          bottom: '-5%',
          left: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(15,23,42,0.8) 0%, rgba(234,88,12,0.10) 70%, transparent 100%)',
          filter: 'blur(50px)',
          animation: 'pulse-slow 8s ease-in-out infinite reverse',
        }}
      />
      {/* Subtle grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
