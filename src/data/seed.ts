import type { Person } from "../models/types";
import { Team, Role } from "../models/types";

export const seedPeople: Person[] = [
  { id: "1", name: "Ava Chen", team: Team.PLATFORM, role: Role.IC, level: 3, isActive: true, skills: ["react", "graphql"], reportsToId: "4" },
  { id: "2", name: "Noah Patel", team: Team.PRODUCT, role: Role.IC, level: 2, isActive: true, skills: ["ux", "research"], reportsToId: "5" },
  { id: "3", name: "Mia Gomez", team: Team.DESIGN, role: Role.IC, level: 4, isActive: false, skills: ["figma", "design-systems"], reportsToId: "6" },
  { id: "4", name: "Liam Brooks", team: Team.PLATFORM, role: Role.MANAGER, level: 5, isActive: true, skills: ["leadership", "typescript"] },
  { id: "5", name: "Sophia Kim", team: Team.PRODUCT, role: Role.MANAGER, level: 5, isActive: true, skills: ["strategy", "roadmaps"] },
  { id: "6", name: "Ethan Reed", team: Team.DESIGN, role: Role.DIRECTOR, level: 5, isActive: true, skills: ["org-design", "hiring"] },
];
