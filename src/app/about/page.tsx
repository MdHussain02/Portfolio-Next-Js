"use client";

import {
  usePersonal,
  useStats,
  useExperience,
  useEducation,
  useCertifications,
} from "@/hooks";
import {
  Button,
  Section,
  SectionHeader,
  Card,
  Animate,
  CountUp,
  LocationIcon,
  DownloadIcon,
  BriefcaseIcon,
  AcademicIcon,
} from "@/components/ui";

export default function About() {
  const personal = usePersonal();
  const stats = useStats();
  const experience = useExperience();
  const education = useEducation();
  const certifications = useCertifications();

  return (
    <>
      {/* Hero */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Animate>
            <div className="aspect-square max-w-sm mx-auto border border-white bg-white/5 flex items-center justify-center">
              <span className="text-8xl font-bold text-white/20">
                {personal.initials}
              </span>
            </div>
          </Animate>

          <div className="space-y-4">
            <Animate>
              <span className="text-gray-500 uppercase tracking-wider text-xs">
                About Me
              </span>
            </Animate>
            <Animate delay={0.03}>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {personal.title} Based in {personal.location.split(",")[0]}
              </h1>
            </Animate>
            {personal.aboutMe.map((text, i) => (
              <Animate key={i} delay={0.06 + i * 0.03}>
                <p className="text-gray-400 text-sm">{text}</p>
              </Animate>
            ))}
            <Animate delay={0.12}>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <LocationIcon size={16} className="text-white" />
                {personal.location}
              </div>
            </Animate>
            <Animate delay={0.15}>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button href="/contact">Let's Talk</Button>
                <Button href={personal.resumeUrl} variant="outline">
                  <span className="flex items-center gap-1.5">
                    <DownloadIcon size={14} />
                    Download CV
                  </span>
                </Button>
              </div>
            </Animate>
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <Animate key={stat.label} delay={i * 0.05}>
              <Card className="text-center">
                <span className="text-3xl font-bold text-white">
                  <CountUp value={stat.value} duration={1500} />
                </span>
                <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </Card>
            </Animate>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section>
        <Animate>
          <SectionHeader title="Experience" />
        </Animate>
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Work */}
          <div>
            <Animate delay={0.05}>
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 border border-white">
                  <BriefcaseIcon size={18} className="text-white" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Work
                </h3>
              </div>
            </Animate>
            <div className="space-y-5">
              {experience.map((exp, i) => (
                <Animate key={exp.id} delay={0.08 + i * 0.05}>
                  <div className="pl-5 border-l border-white/20 hover:border-white/50 transition-colors">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      {exp.period}
                    </span>
                    <h4 className="text-white font-bold mt-1">{exp.title}</h4>
                    <p className="text-gray-400 text-sm">{exp.company}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      {exp.description}
                    </p>
                  </div>
                </Animate>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <Animate delay={0.05}>
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 border border-white">
                  <AcademicIcon size={18} className="text-white" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Education
                </h3>
              </div>
            </Animate>
            {education.map((edu, i) => (
              <Animate key={edu.id} delay={0.08 + i * 0.05}>
                <Card>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    {edu.period}
                  </span>
                  <h4 className="text-white font-bold mt-1">{edu.degree}</h4>
                  <p className="text-gray-400 text-sm">{edu.school}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {edu.description}
                  </p>
                </Card>
              </Animate>
            ))}

            <Animate delay={0.2}>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mt-8 mb-3">
                Certifications
              </h4>
              <div className="space-y-2">
                {certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 border border-white/20 hover:border-white/40 transition-colors"
                  >
                    <div className="w-1.5 h-1.5 bg-white" />
                    <span className="text-gray-400 text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </Animate>
          </div>
        </div>
      </Section>
    </>
  );
}
