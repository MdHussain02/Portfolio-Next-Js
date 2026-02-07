"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  id: number;
  life: number;
  maxLife: number;
}

interface InteractiveParticlesProps {
  children?: React.ReactNode;
  className?: string;
  particleCount?: number;
  particleColor?: string;
  particleSize?: number;
  connectionDistance?: number;
  mouseInfluence?: number;
  animationSpeed?: number;
  interactive?: boolean;
  showConnections?: boolean;
  particleOpacity?: number;
  backgroundOpacity?: number;
  variant?: "floating" | "constellation" | "magnetic" | "trail" | "explosion";
}

const InteractiveParticles: React.FC<InteractiveParticlesProps> = ({
  children,
  className = "",
  particleCount = 50,
  particleColor = "#ffffff",
  particleSize = 2,
  connectionDistance = 100,
  mouseInfluence = 150,
  animationSpeed = 1,
  interactive = true,
  showConnections = true,
  particleOpacity = 0.6,
  backgroundOpacity = 0.02,
  variant = "floating",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize particles
  const initParticles = useCallback(() => {
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * animationSpeed,
        vy: (Math.random() - 0.5) * animationSpeed,
        size: particleSize + Math.random() * particleSize,
        opacity: particleOpacity,
        color: particleColor,
        id: i,
        life: variant === "explosion" ? Math.random() * 100 : 100,
        maxLife: 100,
      });
    }

    particlesRef.current = particles;
  }, [particleCount, dimensions, animationSpeed, particleSize, particleOpacity, particleColor, variant]);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isActive: true,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.isActive = false;
  }, []);

  // Handle click for explosion effect
  const handleClick = useCallback((e: MouseEvent) => {
    if (variant !== "explosion" || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Create explosion particles
    const explosionParticles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      const speed = 2 + Math.random() * 3;
      explosionParticles.push({
        x: clickX,
        y: clickY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: particleSize * (0.5 + Math.random()),
        opacity: particleOpacity,
        color: particleColor,
        id: particlesRef.current.length + i,
        life: 60,
        maxLife: 60,
      });
    }

    particlesRef.current = [...particlesRef.current, ...explosionParticles];
  }, [variant, particleSize, particleOpacity, particleColor]);

  // Update particle positions and behaviors
  const updateParticles = useCallback(() => {
    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    particles.forEach((particle, index) => {
      // Different behaviors based on variant
      switch (variant) {
        case "floating":
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Bounce off walls
          if (particle.x <= 0 || particle.x >= dimensions.width) particle.vx *= -1;
          if (particle.y <= 0 || particle.y >= dimensions.height) particle.vy *= -1;
          break;

        case "constellation":
          particle.x += particle.vx * 0.3;
          particle.y += particle.vy * 0.3;

          // Slower movement, wrap around edges
          if (particle.x < 0) particle.x = dimensions.width;
          if (particle.x > dimensions.width) particle.x = 0;
          if (particle.y < 0) particle.y = dimensions.height;
          if (particle.y > dimensions.height) particle.y = 0;
          break;

        case "magnetic":
          if (mouse.isActive && interactive) {
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouseInfluence) {
              const force = (mouseInfluence - distance) / mouseInfluence;
              particle.vx += (dx / distance) * force * 0.1;
              particle.vy += (dy / distance) * force * 0.1;
            }
          }

          // Apply friction
          particle.vx *= 0.95;
          particle.vy *= 0.95;

          particle.x += particle.vx;
          particle.y += particle.vy;

          // Keep within bounds
          particle.x = Math.max(0, Math.min(dimensions.width, particle.x));
          particle.y = Math.max(0, Math.min(dimensions.height, particle.y));
          break;

        case "trail":
          if (mouse.isActive && interactive) {
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            particle.vx = dx * 0.05;
            particle.vy = dy * 0.05;
          }

          particle.x += particle.vx;
          particle.y += particle.vy;

          // Wrap around
          if (particle.x < 0) particle.x = dimensions.width;
          if (particle.x > dimensions.width) particle.x = 0;
          if (particle.y < 0) particle.y = dimensions.height;
          if (particle.y > dimensions.height) particle.y = 0;
          break;

        case "explosion":
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.life--;
          particle.opacity = (particle.life / particle.maxLife) * particleOpacity;

          // Apply gravity
          particle.vy += 0.05;

          // Remove dead particles
          if (particle.life <= 0) {
            particles.splice(index, 1);
          }
          break;
      }

      // Mouse interaction for all variants except explosion
      if (variant !== "explosion" && mouse.isActive && interactive) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseInfluence) {
          const force = (mouseInfluence - distance) / mouseInfluence;
          particle.size = particleSize + force * particleSize;
          particle.opacity = Math.min(1, particleOpacity + force * 0.4);
        } else {
          particle.size = particleSize;
          particle.opacity = particleOpacity;
        }
      }
    });
  }, [variant, dimensions, mouseInfluence, interactive, particleSize, particleOpacity]);

  // Draw particles and connections
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;

    // Draw connections
    if (showConnections && variant === "constellation") {
      ctx.strokeStyle = particleColor;
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * backgroundOpacity;
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // Draw particles
    particles.forEach(particle => {
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      // Add glow effect for magnetic variant
      if (variant === "magnetic" && mouseRef.current.isActive) {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseInfluence) {
          ctx.globalAlpha = 0.3;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });

    ctx.globalAlpha = 1;
  }, [showConnections, variant, connectionDistance, backgroundOpacity, particleColor, mouseInfluence]);

  // Animation loop
  const animate = useCallback(() => {
    updateParticles();
    draw();
    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticles, draw]);

  // Handle resize
  const handleResize = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }
  }, []);

  // Setup event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !interactive) return;

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('click', handleClick);
    };
  }, [interactive, handleMouseMove, handleMouseLeave, handleClick]);

  // Setup resize observer
  useEffect(() => {
    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [handleResize]);

  // Initialize particles when dimensions change
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      initParticles();
    }
  }, [dimensions, initParticles]);

  // Start animation
  useEffect(() => {
    if (particlesRef.current.length > 0) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  // Update canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && dimensions.width && dimensions.height) {
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
    }
  }, [dimensions]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Content */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}

      {/* Interactive overlay */}
      {interactive && (
        <div className="absolute inset-0 pointer-events-auto opacity-0 z-0" />
      )}
    </div>
  );
};

export default InteractiveParticles;
