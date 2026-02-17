export enum Role {
  IC = "IC",
  MANAGER = "Manager",
  DIRECTOR = "Director",
}

export enum Team {
  PLATFORM = "Platform",
  PRODUCT = "Product", 
  DESIGN = "Design",
  SALES = "Sales",
}

export type TeamFilter = Team | "All";

export const TeamFilter = {
  ALL: "All" as const,
  PLATFORM: Team.PLATFORM,
  PRODUCT: Team.PRODUCT,
  DESIGN: Team.DESIGN,
  SALES: Team.SALES,
} as const;

export type Level = 1 | 2 | 3 | 4 | 5;

export type Person = {
  id: string;
  name: string;
  team: Team;
  role: Role;
  level: Level;
  isActive: boolean;
  skills: string[];
  reportsToId?: string;
};

export enum SortMode {
  NAME_ASC = "NAME_ASC",
  LEVEL_DESC = "LEVEL_DESC",
}

export type TeamStats = Record<
  Team,
  { total: number; active: number; managers: number; avgLevel: number }
>;
