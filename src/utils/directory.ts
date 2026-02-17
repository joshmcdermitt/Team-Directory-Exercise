import type { DirectoryState, Person, Team, TeamStats, Level } from "../models/types";
import { Role, SortMode, TeamFilter } from "../models/types";


export function normalizePeople(people: Person[]): Record<string, Person> {
  return people.reduce((acc, person) => {
    acc[person.id] = { ...person, skills: [...person.skills] };
    return acc;
  }, {} as Record<string, Person>);
}


export function denormalizePeople(map: Record<string, Person>): Person[] {
  const newObj = Object.values(map);
  return newObj;
}

export function groupByTeam(
  people: Person[],
  teamOrder: Team[]
): Array<{ team: Team; members: Person[] }> {
  // Group people by team
  const peopleByTeam: Record<Team, Person[]> = {} as Record<Team, Person[]>;
  
  people.forEach((person) => {
    if (!peopleByTeam[person.team]) {
      peopleByTeam[person.team] = [];
    }
    peopleByTeam[person.team].push(person);
  });

  // Return teams in the specified order with their members
  return teamOrder.map((team) => ({
    team,
    members: peopleByTeam[team] || []
  }));
}

export function applyFilters(
  people: Person[],
  state: Pick<DirectoryState, "selectedTeam" | "search" | "showInactive">
): Person[] {
  // Early return if no filters are active
  if (
    state.selectedTeam === TeamFilter.ALL &&
    state.showInactive &&
    !state.search.trim()
  ) {
    return people;
  }

  let filtered = people;
  
  // Filter by team
  if (state.selectedTeam !== TeamFilter.ALL) {
    filtered = filtered.filter((person) => person.team === state.selectedTeam as unknown as Team);
  }
  
  // Filter by active status
  if (!state.showInactive) {
    filtered = filtered.filter((person) => person.isActive);
  }
  
  // Filter by search term
  if (state.search.trim()) {
    const searchTerm = state.search.toLowerCase();
    filtered = filtered.filter((person) => 
      person.name.toLowerCase().includes(searchTerm) ||
      person.skills.some((skill) => skill.toLowerCase().includes(searchTerm))
    );
  }
  return filtered;
}

export function applySort(people: Person[], sort: DirectoryState["sort"]): Person[] {
  const copy = [...people];

  switch (sort) {
    case SortMode.NAME_ASC:
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case SortMode.LEVEL_DESC:
      return copy.sort((a, b) => (b.level - a.level) || a.name.localeCompare(b.name));
    default:
      return copy;
  }
}

export function promotePerson(
  map: Record<string, Person>,
  personId: string
): Record<string, Person> {
  const person = map[personId];
  if (!person || person.level >= 5) {
    return map;
  }

  const newLevel = person.level + 1;
  const newRole = person.role === Role.IC && newLevel === 5 ? Role.MANAGER : person.role;

  return {
    ...map,
    [personId]: {
      ...person,
      level: newLevel as Level,
      role: newRole
    }
  };
}

export function movePersonToTeam(
  map: Record<string, Person>,
  personId: string,
  newTeam: Team
): Record<string, Person> {
  const person = map[personId];
  if (!person || person.team === newTeam) {
    return map;
  }

  return {
    ...map,
    [personId]: {
      ...person,
      team: newTeam
    }
  };
}

export function toggleActive(
  map: Record<string, Person>,
  personId: string
): Record<string, Person> {
  const person = map[personId];
  if (!person) {
    return map;
  }

  return {
    ...map,
    [personId]: {
      ...person,
      isActive: !person.isActive
    }
  };
}

export function getTeamStats(people: Person[], teamOrder: Team[]): TeamStats {
  // Start with empty stats for all teams
  const stats = Object.fromEntries(
    teamOrder.map((t) => [t, { total: 0, active: 0, managers: 0, avgLevel: 0 }])
  ) as TeamStats;

  // Group people by team
  const peopleByTeam: Record<Team, Person[]> = {} as Record<Team, Person[]>;
  
  people.forEach((person) => {
    if (!peopleByTeam[person.team]) {
      peopleByTeam[person.team] = [];
    }
    peopleByTeam[person.team].push(person);
  });

  // Calculate stats for each team
  teamOrder.forEach((team) => {
    const teamPeople = peopleByTeam[team] || [];
    
    if (teamPeople.length > 0) {
      const activePeople = teamPeople.filter(p => p.isActive);
      const managers = teamPeople.filter(p => p.role === Role.MANAGER || p.role === Role.DIRECTOR);
      const totalLevel = teamPeople.reduce((sum, p) => sum + p.level, 0);
      const avg = teamPeople.length === 0 ? 0 : totalLevel / teamPeople.length;
      const avgLevel = Math.round(avg * 10) / 10;
      
      stats[team] = {
        total: teamPeople.length,
        active: activePeople.length,
        managers: managers.length,
        avgLevel: avgLevel
      };
    }
  });

  return stats;
}
