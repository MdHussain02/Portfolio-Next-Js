"use client";

import { useSkills, useSoftSkills, useLearningTech } from "@/hooks";
import {
  Section,
  SectionHeader,
  AnimatedSkillBar,
  Animate,
  techIcons,
} from "@/components/ui";

export default function Skills() {
  const skills = useSkills();
  const softSkills = useSoftSkills();
  const learningTech = useLearningTech();

  const categories = [
    { title: "Frontend", data: skills.frontend },
    { title: "Backend & Database", data: skills.backend },
    { title: "Tools & DevOps", data: skills.tools },
  ];

  return (
    <>
      <Section>
        <Animate>
          <SectionHeader
            label="My Expertise"
            title="Skills & Technologies"
            description="A comprehensive overview of my technical skills."
          />
        </Animate>

        <div className="space-y-10">
          {categories.map((cat, ci) => (
            <div key={cat.title}>
              <Animate delay={ci * 0.05}>
                <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-4">
                  {cat.title}
                </h2>
              </Animate>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {cat.data.map((skill, i) => (
                  <AnimatedSkillBar
                    key={skill.name}
                    skill={skill}
                    delay={ci * 200 + i * 50}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Soft Skills */}
      <Section>
        <Animate onScroll>
          <SectionHeader
            title="Soft Skills"
            description="Skills that enable effective collaboration."
          />
        </Animate>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {softSkills.map((skill, i) => (
            <AnimatedSkillBar
              key={skill.name}
              skill={skill}
              showIcon={false}
              delay={i * 80}
            />
          ))}
        </div>
      </Section>

      {/* Tech Marquee */}
      <Section className="overflow-hidden">
        <Animate onScroll>
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Technologies I Work With
          </h2>
        </Animate>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 overflow-hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 overflow-hidden" />
          <div className="flex gap-4 animate-marquee ">
            {[...techIcons, ...techIcons].map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 border border-white/20 whitespace-nowrap"
              >
                <span className="text-lg text-white">{tech.icon}</span>
                <span className="text-white text-xs uppercase tracking-wider">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Learning */}
      <Section>
        <Animate onScroll>
          <div className="border border-white/20 p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Always Learning
            </h2>
            <p className="text-gray-500 mb-5 max-w-md mx-auto">
              Currently exploring new technologies.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {learningTech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 border border-white/20 text-gray-400 text-xs uppercase tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Animate>
      </Section>
    </>
  );
}
