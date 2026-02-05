import data from "@/data/portfolio.json";
import type { PortfolioData } from "@/types";

// Single export for all data
export const portfolioData = data as PortfolioData;

// Individual hooks for specific data
export const usePersonal = () => portfolioData.personal;
export const useSocial = () => portfolioData.social;
export const useStats = () => portfolioData.stats;
export const useServices = () => portfolioData.services;
export const useExperience = () => portfolioData.experience;
export const useEducation = () => portfolioData.education;
export const useCertifications = () => portfolioData.certifications;
export const useProjects = () => portfolioData.projects;
export const useSkills = () => portfolioData.skills;
export const useSoftSkills = () => portfolioData.softSkills;
export const useNavLinks = () => portfolioData.navLinks;
export const useProjectCategories = () => portfolioData.projectCategories;
export const useContactSubjects = () => portfolioData.contactSubjects;
export const useLearningTech = () => portfolioData.learningTech;
