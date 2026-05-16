import { useEffect, useRef } from 'react';

export default function CursorFollower() {
  const containerRef = useRef(null);
  const orbRef = useRef(null);
  const bubblesRef = useRef([]);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let orbX = 0;
    let orbY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Create a trail bubble
      if (Math.random() > 0.8) {
        createBubble(mouseX, mouseY);
      }
    };

    const createBubble = (x, y) => {
      const bubble = document.createElement('div');
      bubble.className = 'cursor-bubble';
      bubble.style.left = x + 'px';
      bubble.style.top = y + 'px';
      
      const size = Math.random() * 15 + 10;
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      
      containerRef.current.appendChild(bubble);

      // Animate and remove
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 50 + 20;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;

      bubble.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 0.6 },
        { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
      ], {
        duration: 1000,
        easing: 'ease-out'
      }).onfinish = () => bubble.remove();
    };

    const animateOrb = () => {
      // Lerp for smooth orb movement
      const lerp = 0.1;
      orbX += (mouseX - orbX) * lerp;
      orbY += (mouseY - orbY) * lerp;

      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${orbX - 24}px, ${orbY - 24}px)`;
      }

      requestAnimationFrame(animateOrb);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationFrame = requestAnimationFrame(animateOrb);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div id="cursor-container" ref={containerRef}>
      <div ref={orbRef} className="cursor-orb" />
    </div>
  );
}
