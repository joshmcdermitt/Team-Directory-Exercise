import type { Person, Role } from '../models/types';

export const isManager = (role: Role): boolean => {
  return role === 'Manager' || role === 'Director';
};

export const calculateAverageLevel = (people: Person[]): number => {
  if (people.length === 0) return 0;
  const totalLevel = people.reduce((sum, person) => sum + person.level, 0);
  return totalLevel / people.length;
};

export const groupByTeam = <T extends { team: string }>(items: T[], teamOrder: string[]) => {
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.team]) {
      acc[item.team] = [];
    }
    acc[item.team].push(item);
    return acc;
  }, {} as Record<string, T[]>);

  return teamOrder.map(team => ({
    team,
    members: grouped[team] || []
  }));
};

export const debugLog = (message: string, data?: any) => {
  // Simplified debug logging for now
  console.log(message, data);
};
