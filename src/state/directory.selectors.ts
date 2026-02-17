import type { DirectoryState } from "../models/types";
import {
  applyFilters,
  applySort,
  denormalizePeople,
  getTeamStats,
  groupByTeam,
} from "../utils/directory";

export function selectDenormalizedPeople(state: DirectoryState) {
  return denormalizePeople(state.peopleById);
}

export function selectVisiblePeople(state: DirectoryState) {
  const all = selectDenormalizedPeople(state);
  const filtered = applyFilters(all, state);
  const sorted = applySort(filtered, state.sort);
  return sorted;
}

export function selectGroupedByTeam(state: DirectoryState) {
  const visible = selectVisiblePeople(state);
  return groupByTeam(visible, state.teamOrder);
}

export function selectTeamStats(state: DirectoryState) {
  const all = selectDenormalizedPeople(state);
  return getTeamStats(all, state.teamOrder);
}
