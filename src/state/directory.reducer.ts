import type { DirectoryState, SortMode, Team, Person } from "../models/types";
import { DirectoryActionType, Team as TeamEnum, SortMode as SortModeEnum, TeamFilter } from "../models/types";
import { movePersonToTeam, promotePerson, toggleActive, normalizePeople } from "../utils/directory";

export type DirectoryAction =
  | { type: DirectoryActionType.SET_TEAM; team: DirectoryState["selectedTeam"] }
  | { type: DirectoryActionType.SET_SEARCH; search: string }
  | { type: DirectoryActionType.SET_SORT; sort: SortMode }
  | { type: DirectoryActionType.TOGGLE_SHOW_INACTIVE }
  | { type: DirectoryActionType.PROMOTE; personId: string }
  | { type: DirectoryActionType.MOVE_TEAM; personId: string; team: Team }
  | { type: DirectoryActionType.TOGGLE_ACTIVE; personId: string }
  | { type: DirectoryActionType.SET_PEOPLE; people: Person[] };

export const initialDirectoryState: DirectoryState = {
  peopleById: {},
  teamOrder: [TeamEnum.PLATFORM, TeamEnum.PRODUCT, TeamEnum.DESIGN, TeamEnum.SALES],
  selectedTeam: TeamFilter.ALL,
  search: "",
  sort: SortModeEnum.NAME_ASC,
  showInactive: true,
};

export function directoryReducer(state: DirectoryState, action: DirectoryAction): DirectoryState {
  switch (action.type) {
    case DirectoryActionType.SET_TEAM:
      if (state.selectedTeam === action.team) return state;
      return { ...state, selectedTeam: action.team };

    case DirectoryActionType.SET_SEARCH:
      if (state.search === action.search) return state;
      return { ...state, search: action.search };

    case DirectoryActionType.SET_SORT:
      if (state.sort === action.sort) return state;
      return { ...state, sort: action.sort };

    case DirectoryActionType.TOGGLE_SHOW_INACTIVE:
      return { ...state, showInactive: !state.showInactive };

    case DirectoryActionType.PROMOTE: {
      const updatedPeople = promotePerson(state.peopleById, action.personId);
      if (updatedPeople === state.peopleById) return state;
      return { ...state, peopleById: updatedPeople };
    }

    case DirectoryActionType.MOVE_TEAM: {
      const updatedPeople = movePersonToTeam(state.peopleById, action.personId, action.team);
      if (updatedPeople === state.peopleById) return state;
      return { ...state, peopleById: updatedPeople };
    }

    case DirectoryActionType.TOGGLE_ACTIVE: {
      const updatedPeople = toggleActive(state.peopleById, action.personId);
      if (updatedPeople === state.peopleById) return state;
      return { ...state, peopleById: updatedPeople };
    }

    case DirectoryActionType.SET_PEOPLE: {
      const peopleById = normalizePeople(action.people);
      return { ...state, peopleById };
    }

    default:
      return state;
  }
}
