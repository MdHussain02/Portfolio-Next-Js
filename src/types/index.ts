export interface Personal {
  name: string;
  initials: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  aboutMe: string[];
  resumeUrl: string;
  available: boolean;
}

export interface Social {
  github: string;
  linkedin: string;
  twitter: string;
  dribbble: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface SoftSkill {
  name: string;
  level: number;
}

export interface Skills {
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
}

export interface NavLink {
  href: string;
  label: string;
}

export interface ContactSubject {
  value: string;
  label: string;
}

export interface PortfolioData {
  personal: Personal;
  social: Social;
  stats: Stat[];
  services: Service[];
  experience: Experience[];
  education: Education[];
  certifications: string[];
  projects: Project[];
  skills: Skills;
  softSkills: SoftSkill[];
  learningTech: string[];
  navLinks: NavLink[];
  projectCategories: string[];
  contactSubjects: ContactSubject[];
}

// Component Props Types
export interface AnimationProps {
  delay?: number;
  duration?: number;
  className?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export interface ProjectCardProps {
  project: Project;
  index?: number;
}

export interface SkillCardProps {
  skill: Skill | SoftSkill;
  index?: number;
}

export interface ExperienceCardProps {
  experience: Experience;
  index?: number;
}

export interface SectionProps {
  className?: string;
  children?: React.ReactNode;
}
