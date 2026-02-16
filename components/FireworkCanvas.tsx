
import React, { useEffect, useRef } from 'react';

const FireworkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cw = window.innerWidth;
    let ch = window.innerHeight;
    canvas.width = cw;
    canvas.height = ch;

    const handleResize = () => {
      cw = window.innerWidth;
      ch = window.innerHeight;
      canvas.width = cw;
      canvas.height = ch;
    };

    window.addEventListener('resize', handleResize);

    class Particle {
      x: number; y: number; color: string; velocity: { x: number; y: number };
      alpha: number; friction: number; gravity: number;
      constructor(x: number, y: number, color: string) {
        this.x = x; this.y = y; this.color = color;
        this.velocity = { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8 };
        this.alpha = 1; this.friction = 0.96; this.gravity = 0.04;
      }
      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
      update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
      }
    }

    class Firework {
      x: number; y: number; targetY: number; color: string;
      velocity: { x: number; y: number }; exploded: boolean;
      constructor(x: number, targetY: number, color: string) {
        this.x = x; this.y = ch; this.targetY = targetY; this.color = color;
        this.velocity = { x: (Math.random() - 0.5) * 2, y: -10 - Math.random() * 4 };
        this.exploded = false;
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + 6);
        ctx.strokeStyle = this.color;
        ctx.stroke();
      }
      update() {
        this.y += this.velocity.y;
        if (this.y <= this.targetY || this.velocity.y >= 0) {
          this.exploded = true;
        }
      }
    }

    let particles: Particle[] = [];
    let fireworks: Firework[] = [];

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 12, 41, 0.2)';
      ctx.fillRect(0, 0, cw, ch);

      if (Math.random() < 0.04) {
        const x = Math.random() * cw;
        const targetY = Math.random() * (ch * 0.5);
        const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        fireworks.push(new Firework(x, targetY, color));
      }

      fireworks.forEach((fw, i) => {
        fw.update();
        fw.draw();
        if (fw.exploded) {
          for (let j = 0; j < 60; j++) {
            particles.push(new Particle(fw.x, fw.y, fw.color));
          }
          fireworks.splice(i, 1);
        }
      });

      particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(i, 1);
      });

      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />;
};

export default FireworkCanvas;
