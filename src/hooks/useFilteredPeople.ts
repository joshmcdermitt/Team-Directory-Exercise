import { useMemo } from 'react';
import { TeamFilter, SortMode } from '../models/types';
import type { Person } from '../models/types';
import { TEAM_ORDER } from '../constants';

export const useFilteredPeople = (
  allPeople: Person[],
  selectedTeam: TeamFilter,
  search: string,
  showInactive: boolean,
  sort: SortMode
) => {
  const visiblePeople = useMemo(() => {
    let people = allPeople;
    
    // Filter by team
    if (selectedTeam !== TeamFilter.ALL) {
      people = people.filter(p => p.team === selectedTeam);
    }
    
    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      people = people.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.skills.some((skill: string) => skill.toLowerCase().includes(searchLower))
      );
    }
    
    // Filter by active status
    if (!showInactive) {
      people = people.filter(p => p.isActive);
    }
    
    // Sort
    if (sort === SortMode.NAME_ASC) {
      people.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === SortMode.LEVEL_DESC) {
      people.sort((a, b) => b.level - a.level);
    }
    
    return people;
  }, [allPeople, selectedTeam, search, showInactive, sort]);

  const grouped = useMemo(() => {
    const grouped = visiblePeople.reduce((acc, person) => {
      if (!acc[person.team]) {
        acc[person.team] = [];
      }
      acc[person.team].push(person);
      return acc;
    }, {} as Record<string, typeof visiblePeople>);
    
    // Show all teams, even empty ones
    return TEAM_ORDER.map(team => ({
      team,
      members: grouped[team] || []
    }));
  }, [visiblePeople]);

  return { visiblePeople, grouped };
};
