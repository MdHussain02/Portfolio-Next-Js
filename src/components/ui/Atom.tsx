"use client";

import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Float, Line, Sphere, Trail, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiJavascript,
    SiNodedotjs,
    SiGit,
    SiFramer,
} from "react-icons/si";

const Electron = ({
    radius = 2.5,
    speed = 6,
    icon: Icon,
    phase = 0,
    url,
    ...props
}: {
    radius?: number;
    speed?: number;
    icon: React.ElementType;
    phase?: number;
    url: string;
} & Record<string, any>) => {
    const ref = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (!hovered) {
            const t = state.clock.getElapsedTime() * speed + phase;
            if (ref.current) {
                ref.current.position.set(
                    Math.sin(t) * radius,
                    (Math.cos(t) * radius * Math.sin(t)) / 2,
                    Math.cos(t) * radius
                );
            }
        }
    });

    return (
        <group {...props}>
            <Trail
                local
                width={1}
                length={8}
                color={new THREE.Color("#ffffff")}
                attenuation={(t) => t * t}
            >
                <mesh
                    ref={ref}
                    onPointerOver={(e) => {
                        e.stopPropagation();
                        setHovered(true);
                    }}
                    onPointerOut={() => setHovered(false)}
                >
                    <sphereGeometry args={[0.2]} />
                    <meshBasicMaterial color="white" visible={false} />
                    <Html center className="pointer-events-auto">
                        <div
                            onClick={() => window.open(url, "_blank")}
                            className={`w-8 h-8 rounded-full bg-black border border-white/40 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)] cursor-pointer transition-transform duration-300 ${hovered ? "scale-150 border-white bg-black/90 z-50" : "scale-100"}`}
                        >
                            {React.createElement(Icon, { className: "text-white w-4 h-4" })}
                        </div>
                    </Html>
                </mesh>
            </Trail>
        </group>
    );
};

const Nucleus = () => {
    return (
        <mesh>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={0.8}
                roughness={0.1}
                metalness={0.8}
            />
            <pointLight distance={10} intensity={2} color="#ffffff" />
        </mesh>
    );
};

const AtomContent = () => {
    return (
        <group scale={1.2}>
            <Center>
                <Nucleus />
                {/* Core Stack - Tighter Orbits */}
                <Electron
                    rotation={[0, 0, Math.PI / 3]}
                    speed={1.5}
                    radius={2.5}
                    phase={0}
                    icon={SiReact}
                    url="https://react.dev"
                />
                <Electron
                    rotation={[Math.PI / 3, 0, Math.PI / 3]}
                    speed={1.6}
                    radius={2.7}
                    phase={Math.PI / 2}
                    icon={SiNextdotjs}
                    url="https://nextjs.org"
                />
                <Electron
                    rotation={[-Math.PI / 3, 0, Math.PI / 3]}
                    speed={1.7}
                    radius={2.9}
                    phase={Math.PI}
                    icon={SiTypescript}
                    url="https://www.typescriptlang.org"
                />

                {/* Extended Stack - Wider Orbits */}
                <Electron
                    radius={3.1}
                    rotation={[Math.PI / 2, Math.PI / 4, 0]}
                    speed={1.3}
                    phase={0}
                    icon={SiTailwindcss}
                    url="https://tailwindcss.com"
                />
                <Electron
                    radius={3.3}
                    rotation={[0, Math.PI / 2, 0]}
                    speed={1.4}
                    phase={Math.PI / 2}
                    icon={SiJavascript}
                    url="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                />
                <Electron
                    radius={3.5}
                    rotation={[Math.PI / 4, Math.PI / 4, Math.PI / 4]}
                    speed={1.5}
                    phase={Math.PI}
                    icon={SiNodedotjs}
                    url="https://nodejs.org"
                />
                <Electron
                    radius={3.7}
                    rotation={[0, -Math.PI / 3, 0]}
                    speed={1.6}
                    phase={0}
                    icon={SiGit}
                    url="https://git-scm.com"
                />
                <Electron
                    radius={3.9}
                    rotation={[Math.PI / 6, 0, -Math.PI / 6]}
                    speed={1.4}
                    phase={Math.PI / 2}
                    icon={SiFramer}
                    url="https://www.framer.com/motion/"
                />
            </Center>
        </group>
    );
};

export const Atom: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <div className={`w-full h-full min-h-[400px] ${className}`}>
            <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
                <ambientLight intensity={0.3} />
                <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    <AtomContent />
                </Float>
                <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
};

export default Atom;
