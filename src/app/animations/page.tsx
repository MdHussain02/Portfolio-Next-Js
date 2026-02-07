"use client";

import React, { useState } from "react";
import {
  CheckLinesBackground,
  InteractiveParticles,
  AnimatedGridOverlay,
  Section,
  SectionHeader,
  Card,
  Button,
} from "@/components/ui";

const AnimationShowcase = () => {
  const [selectedDemo, setSelectedDemo] = useState<string>("grid");

  const demos = [
    {
      id: "grid",
      title: "Interactive Grid",
      description: "Mouse trail effects with responsive grid patterns",
      component: (
        <CheckLinesBackground
          className="h-64 flex items-center justify-center"
          variant="grid"
          gridSize={50}
          opacity={0.1}
          interactive={true}
          animationType="mouseTrail"
          intensity={2}
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Move Your Mouse</h3>
            <p className="text-gray-400">Watch the grid react to your cursor</p>
          </div>
        </CheckLinesBackground>
      ),
    },
    {
      id: "particles",
      title: "Constellation Effect",
      description: "Connected particles that respond to mouse interaction",
      component: (
        <InteractiveParticles
          className="h-64 flex items-center justify-center"
          variant="constellation"
          particleCount={40}
          connectionDistance={100}
          mouseInfluence={150}
          particleOpacity={0.8}
          backgroundOpacity={0.1}
          interactive={true}
          showConnections={true}
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Constellation</h3>
            <p className="text-gray-400">Hover to see particle connections</p>
          </div>
        </InteractiveParticles>
      ),
    },
    {
      id: "magnetic",
      title: "Magnetic Particles",
      description: "Particles that are attracted to your cursor",
      component: (
        <InteractiveParticles
          className="h-64 flex items-center justify-center"
          variant="magnetic"
          particleCount={60}
          mouseInfluence={200}
          particleOpacity={0.6}
          interactive={true}
          showConnections={false}
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Magnetic Field</h3>
            <p className="text-gray-400">Particles follow your mouse</p>
          </div>
        </InteractiveParticles>
      ),
    },
    {
      id: "ripple",
      title: "Ripple Effect",
      description: "Click anywhere to create expanding ripples",
      component: (
        <CheckLinesBackground
          className="h-64 flex items-center justify-center cursor-pointer"
          variant="dots"
          gridSize={40}
          opacity={0.08}
          interactive={true}
          animationType="ripple"
          intensity={1.5}
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Click Anywhere</h3>
            <p className="text-gray-400">Create ripple effects with clicks</p>
          </div>
        </CheckLinesBackground>
      ),
    },
    {
      id: "wave",
      title: "Wave Animation",
      description: "Animated wave patterns with scroll interaction",
      component: (
        <AnimatedGridOverlay
          className="h-64 flex items-center justify-center"
          gridSize={60}
          opacity={0.1}
          animationType="wave"
          speed="medium"
          interactive={true}
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Wave Patterns</h3>
            <p className="text-gray-400">Smooth wave animations</p>
          </div>
        </AnimatedGridOverlay>
      ),
    },
    {
      id: "explosion",
      title: "Explosion Effect",
      description: "Click to create particle explosions",
      component: (
        <InteractiveParticles
          className="h-64 flex items-center justify-center cursor-pointer"
          variant="explosion"
          particleCount={20}
          particleOpacity={0.8}
          interactive={true}
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Click to Explode</h3>
            <p className="text-gray-400">Create particle explosions</p>
          </div>
        </InteractiveParticles>
      ),
    },
    {
      id: "glow",
      title: "Glow Effect",
      description: "Grid lines that glow on hover",
      component: (
        <CheckLinesBackground
          className="h-64 flex items-center justify-center"
          variant="cross"
          gridSize={45}
          opacity={0.06}
          interactive={true}
          animationType="glow"
          color="white"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Hover to Glow</h3>
            <p className="text-gray-400">Grid glows when you hover</p>
          </div>
        </CheckLinesBackground>
      ),
    },
    {
      id: "pulse",
      title: "Pulse Animation",
      description: "Breathing grid pattern with pulse effect",
      component: (
        <CheckLinesBackground
          className="h-64 flex items-center justify-center"
          variant="hexagon"
          gridSize={55}
          opacity={0.08}
          interactive={false}
          animationType="pulse"
          animationSpeed={0.5}
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Pulse Pattern</h3>
            <p className="text-gray-400">Gentle breathing animation</p>
          </div>
        </CheckLinesBackground>
      ),
    },
    {
      id: "matrix",
      title: "Matrix Effect",
      description: "Digital rain pattern with matrix-style animation",
      component: (
        <AnimatedGridOverlay
          className="h-64 flex items-center justify-center"
          gridSize={30}
          opacity={0.1}
          animationType="matrix"
          speed="medium"
          color="#00ff00"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Matrix Rain</h3>
            <p className="text-gray-400">Digital rain effect</p>
          </div>
        </AnimatedGridOverlay>
      ),
    },
  ];

  const backgroundClasses = [
    { name: "Basic Grid", class: "bg-check-lines" },
    { name: "Small Grid", class: "bg-check-lines-sm" },
    { name: "Large Grid", class: "bg-check-lines-lg" },
    { name: "Dots", class: "bg-check-dots" },
    { name: "Diagonal", class: "bg-check-diagonal" },
    { name: "Animated", class: "bg-check-lines-animated" },
    { name: "Hover Glow", class: "grid-hover-glow" },
    { name: "Wave", class: "grid-wave" },
    { name: "Pulse", class: "grid-pulse" },
    { name: "Particle Field", class: "particle-field" },
    { name: "Constellation", class: "constellation" },
    { name: "Matrix Rain", class: "matrix-rain" },
    { name: "Glitch", class: "glitch-grid" },
    { name: "Morph", class: "morph-grid" },
  ];

  return (
    <>
      {/* Hero Section */}
      <CheckLinesBackground
        className="min-h-screen flex items-center justify-center px-4"
        variant="grid"
        gridSize={80}
        opacity={0.03}
        interactive={true}
        animationType="mouseTrail"
        intensity={1}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6">Interactive Animations</h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Explore a collection of interactive background animations and
            effects designed to enhance user engagement and visual appeal.
          </p>
          <Button href="#demos" size="lg">
            Explore Animations
          </Button>
        </div>
      </CheckLinesBackground>

      {/* Interactive Demos Section */}
      <Section id="demos">
        <SectionHeader
          title="Interactive Demos"
          description="Click on any demo below to see different animation effects in action"
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {demos.map((demo) => (
            <div
              key={demo.id}
              className={`cursor-pointer transition-all duration-300`}
              onClick={() => setSelectedDemo(demo.id)}
            >
              <Card
                className={
                  selectedDemo === demo.id
                    ? "border-white/40 bg-white/5"
                    : "border-white/20 hover:border-white/30"
                }
              >
                <div className="h-40 mb-4 overflow-hidden rounded border border-white/10">
                  {demo.component}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {demo.title}
                </h3>
                <p className="text-gray-400 text-sm">{demo.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </Section>

      {/* CSS Classes Section */}
      <AnimatedGridOverlay
        className="py-20"
        animationType="pulse"
        speed="slow"
        opacity={0.02}
      >
        <Section>
          <SectionHeader
            title="CSS Utility Classes"
            description="Ready-to-use CSS classes for quick implementation"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {backgroundClasses.map((bgClass) => (
              <Card key={bgClass.name} className="text-center">
                <div
                  className={`h-24 mb-4 rounded border border-white/10 ${bgClass.class}`}
                />
                <h4 className="font-semibold text-white mb-1">
                  {bgClass.name}
                </h4>
                <code className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
                  {bgClass.class}
                </code>
              </Card>
            ))}
          </div>
        </Section>
      </AnimatedGridOverlay>

      {/* Usage Examples */}
      <Section>
        <SectionHeader
          title="Usage Examples"
          description="How to implement these animations in your projects"
        />

        <div className="space-y-8">
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">
              Component Method
            </h3>
            <div className="bg-black/50 p-4 rounded border border-white/10 overflow-x-auto">
              <pre className="text-sm text-gray-300">
                <code>{`<CheckLinesBackground
  variant="grid"
  gridSize={50}
  opacity={0.05}
  interactive={true}
  animationType="mouseTrail"
  className="min-h-screen"
>
  <YourContent />
</CheckLinesBackground>`}</code>
              </pre>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">
              CSS Class Method
            </h3>
            <div className="bg-black/50 p-4 rounded border border-white/10 overflow-x-auto">
              <pre className="text-sm text-gray-300">
                <code>{`<div className="bg-check-lines min-h-screen">
  <YourContent />
</div>

<div className="particle-field">
  <YourContent />
</div>

<div className="grid-hover-glow interactive-zone">
  <YourContent />
</div>`}</code>
              </pre>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">
              Particle System
            </h3>
            <div className="bg-black/50 p-4 rounded border border-white/10 overflow-x-auto">
              <pre className="text-sm text-gray-300">
                <code>{`<InteractiveParticles
  variant="constellation"
  particleCount={50}
  connectionDistance={100}
  mouseInfluence={150}
  interactive={true}
>
  <YourContent />
</InteractiveParticles>`}</code>
              </pre>
            </div>
          </Card>
        </div>
      </Section>

      {/* Performance Tips */}
      <CheckLinesBackground
        className="py-20"
        variant="diagonal"
        gridSize={100}
        opacity={0.02}
        animationType="glow"
      >
        <Section>
          <SectionHeader
            title="Performance Tips"
            description="Best practices for smooth animations"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">
                ✨ Optimization
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Use lower particle counts on mobile devices</li>
                <li>• Reduce opacity for better performance</li>
                <li>• Disable animations on low-power devices</li>
                <li>• Use CSS transforms instead of position changes</li>
              </ul>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">
                🎯 Best Practices
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Test animations on different devices</li>
                <li>• Provide options to disable animations</li>
                <li>• Use appropriate animation speeds</li>
                <li>• Consider accessibility preferences</li>
              </ul>
            </Card>
          </div>
        </Section>
      </CheckLinesBackground>
    </>
  );
};

export default AnimationShowcase;
