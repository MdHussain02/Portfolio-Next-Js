"use client";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiGit,
  SiFigma,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGraphql,
  SiRedux,
  SiFramer,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { FaGithub, FaLinkedin, FaTwitter, FaDribbble } from "react-icons/fa";
import {
  HiCode,
  HiDesktopComputer,
  HiSparkles,
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiArrowRight,
  HiArrowDown,
  HiMenu,
  HiX,
  HiDownload,
  HiBriefcase,
  HiAcademicCap,
  HiCheck,
  HiExclamation,
} from "react-icons/hi";

// Skill icons map
const skillIcons: Record<string, React.ReactNode> = {
  react: <SiReact />,
  nextjs: <SiNextdotjs />,
  typescript: <SiTypescript />,
  javascript: <SiJavascript />,
  tailwind: <SiTailwindcss />,
  nodejs: <SiNodedotjs />,
  git: <SiGit />,
  figma: <SiFigma />,
  mongodb: <SiMongodb />,
  postgresql: <SiPostgresql />,
  docker: <SiDocker />,
  graphql: <SiGraphql />,
  redux: <SiRedux />,
  framer: <SiFramer />,
  vercel: <SiVercel />,
  vite: <SiVite />,
};

// Service icons map
const serviceIcons: Record<string, React.ReactNode> = {
  code: <HiCode className="w-6 h-6" />,
  desktop: <HiDesktopComputer className="w-6 h-6" />,
  sparkles: <HiSparkles className="w-6 h-6" />,
};

export const getSkillIcon = (name: string) => skillIcons[name] || null;
export const getServiceIcon = (name: string) =>
  serviceIcons[name] || <HiCode className="w-6 h-6" />;

// Direct exports
export {
  HiMail as MailIcon,
  HiPhone as PhoneIcon,
  HiLocationMarker as LocationIcon,
  HiArrowRight as ArrowRightIcon,
  HiArrowDown as ArrowDownIcon,
  HiMenu as MenuIcon,
  HiX as CloseIcon,
  HiDownload as DownloadIcon,
  HiBriefcase as BriefcaseIcon,
  HiAcademicCap as AcademicIcon,
  HiCheck as CheckIcon,
  HiExclamation as ExclamationIcon,
  FaGithub as GithubIcon,
  FaLinkedin as LinkedinIcon,
  FaTwitter as TwitterIcon,
  FaDribbble as DribbbleIcon,
};

// Tech stack for marquee
export const techIcons = [
  { icon: <SiReact />, name: "React" },
  { icon: <SiNextdotjs />, name: "Next.js" },
  { icon: <SiTypescript />, name: "TypeScript" },
  { icon: <SiTailwindcss />, name: "Tailwind" },
  { icon: <SiNodedotjs />, name: "Node.js" },
  { icon: <SiMongodb />, name: "MongoDB" },
  { icon: <SiGit />, name: "Git" },
  { icon: <SiFigma />, name: "Figma" },
];
