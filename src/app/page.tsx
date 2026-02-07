"use client";

import { useState, useEffect } from "react";
import { usePersonal, useServices } from "@/hooks";
import {
  Button,
  Section,
  SectionHeader,
  Card,
  SocialLinks,
  Animate,
  TypeWriter,
  OrbitingBadges,
  getServiceIcon,
  ArrowDownIcon,
} from "@/components/ui";

export default function Home() {
  const personal = usePersonal();
  const services = useServices();
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <Animate>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/20 text-xs text-gray-400 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-white animate-pulse" />
                {personal.available
                  ? "Available for work"
                  : "Currently unavailable"}
              </div>
            </Animate>

            <Animate delay={0.03}>
              <p className="text-gray-500 uppercase tracking-wider text-sm">
                Hello, I&apos;m
              </p>
            </Animate>

            <Animate delay={0.06}>
              <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                {personal.name}
              </h1>
            </Animate>

            <Animate delay={0.09}>
              <p className="text-xl md:text-2xl text-white/90">
                Frontend{" "}
                <span className="font-bold">
                  <TypeWriter text="Developer" delay={300} speed={70} />
                </span>
              </p>
            </Animate>

            <Animate delay={0.12}>
              <p className="text-gray-400 max-w-md">{personal.bio}</p>
            </Animate>

            <Animate delay={0.15}>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button href="/projects" size="lg">
                  View My Work
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Get in Touch
                </Button>
              </div>
            </Animate>

            <Animate delay={0.18}>
              <SocialLinks />
            </Animate>
          </div>

          {/* Decorative with orbiting badges */}
          <div className="hidden lg:flex justify-center">
            <OrbitingBadges />
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500 text-xs uppercase tracking-wider transition-all duration-500 ${
            showScroll ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span>Scroll</span>
          <ArrowDownIcon size={14} className="animate-bounce" />
        </div>
      </section>

      {/* Services */}
      <Section>
        <Animate onScroll>
          <SectionHeader
            title="What I Do"
            description="Creating exceptional digital experiences that combine aesthetics with functionality."
          />
        </Animate>
        <div className="grid md:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <Animate key={service.id} delay={i * 0.03} onScroll>
              <Card className="text-center h-full">
                <div className="inline-flex items-center justify-center w-12 h-12 border border-white/20 text-white mb-4">
                  {getServiceIcon(service.icon)}
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm">{service.description}</p>
              </Card>
            </Animate>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <Animate onScroll>
          <div className="border border-white/20 p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Let&apos;s Work Together
            </h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Have a project in mind? I&apos;d love to hear about it.
            </p>
            <Button href="/contact" size="lg">
              Start a Conversation
            </Button>
          </div>
        </Animate>
      </Section>
    </>
  );
}
