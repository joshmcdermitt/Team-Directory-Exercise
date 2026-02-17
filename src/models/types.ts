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

export enum TeamFilter {
  ALL = "All",
  PLATFORM = "Platform",
  PRODUCT = "Product",
  DESIGN = "Design", 
  SALES = "Sales",
}

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

export enum DirectoryActionType {
  SET_TEAM = "SET_TEAM",
  SET_SEARCH = "SET_SEARCH", 
  SET_SORT = "SET_SORT",
  TOGGLE_SHOW_INACTIVE = "TOGGLE_SHOW_INACTIVE",
  PROMOTE = "PROMOTE",
  MOVE_TEAM = "MOVE_TEAM",
  TOGGLE_ACTIVE = "TOGGLE_ACTIVE",
  SET_PEOPLE = "SET_PEOPLE",
}

export type DirectoryState = {
  peopleById: Record<string, Person>;
  teamOrder: Team[];
  selectedTeam: TeamFilter;
  search: string;
  sort: SortMode;
  showInactive: boolean;
};

export type TeamStats = Record<
  Team,
  { total: number; active: number; managers: number; avgLevel: number }
>;
