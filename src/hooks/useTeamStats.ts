import { useMemo } from 'react';
import type { Person, Team } from '../models/types';
import { TEAM_ORDER } from '../constants';
import { isManager } from '../utils/helpers';

export interface TeamStats {
  total: number;
  active: number;
  managers: number;
  avgLevel: number;
}

export const useTeamStats = (allPeople: Person[]) => {
  return useMemo(() => {
    // Calculate stats in a single pass
    const teamStatsMap = new Map<Team, {
      total: number;
      active: number;
      managers: number;
      totalLevel: number;
    }>();

    // Initialize map
    TEAM_ORDER.forEach(team => {
      teamStatsMap.set(team, { total: 0, active: 0, managers: 0, totalLevel: 0 });
    });

    // Single pass through all people
    allPeople.forEach(person => {
      const stats = teamStatsMap.get(person.team);
      if (stats) {
        stats.total++;
        if (person.isActive) stats.active++;
        if (isManager(person.role)) stats.managers++;
        stats.totalLevel += person.level;
      }
    });

    // Convert to final stats with calculated averages
    const finalStats: Record<Team, TeamStats> = {} as Record<Team, TeamStats>;
    TEAM_ORDER.forEach(team => {
      const stats = teamStatsMap.get(team)!;
      finalStats[team] = {
        total: stats.total,
        active: stats.active,
        managers: stats.managers,
        avgLevel: stats.total > 0 ? stats.totalLevel / stats.total : 0
      };
    });

    return finalStats;
  }, [allPeople]);
};
