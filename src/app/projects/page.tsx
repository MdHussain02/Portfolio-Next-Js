"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects, useProjectCategories, useStats } from "@/hooks";
import {
  Button,
  Section,
  SectionHeader,
  ProjectCard,
  Animate,
  FilterButton,
  CountUpStat,
} from "@/components/ui";

export default function Projects() {
  const projects = useProjects();
  const categories = useProjectCategories();
  const stats = useStats();
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <Section>
        <Animate>
          <SectionHeader
            label="My Work"
            title="Featured Projects"
            description="A collection of projects I've worked on, each representing unique challenges."
          />
        </Animate>

        {/* Filter */}
        <Animate delay={0.05}>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <FilterButton
                key={cat}
                label={cat}
                active={active === cat}
                onClick={() => setActive(cat)}
              />
            ))}
          </div>
        </Animate>

        {/* Grid with layout animation */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 py-12"
          >
            No projects in this category.
          </motion.p>
        )}
      </Section>

      {/* Stats */}
      <Section>
        <Animate onScroll>
          <div className="border border-white/20 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <CountUpStat
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  delay={index * 150}
                />
              ))}
            </div>
          </div>
        </Animate>
      </Section>

      {/* CTA */}
      <Section>
        <Animate onScroll>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Have a Project in Mind?
            </h2>
            <p className="text-gray-500 mb-6">
              I&apos;m always excited to collaborate.
            </p>
            <Button href="/contact" size="lg">
              Let&apos;s Discuss
            </Button>
          </div>
        </Animate>
      </Section>
    </>
  );
}
