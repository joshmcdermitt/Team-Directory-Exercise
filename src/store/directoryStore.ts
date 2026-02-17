import { create } from 'zustand';
import type { Person, Team, SortMode } from '../models/types';
import { TeamFilter } from '../models/types';
import { normalizePeople, movePersonToTeam, promotePerson, toggleActive } from '../utils/directory';
import { Team as TeamEnum, SortMode as SortModeEnum } from '../models/types';

interface DirectoryStore {
  // State only
  peopleById: Record<string, Person>;
  teamOrder: Team[];
  selectedTeam: TeamFilter;
  search: string;
  sort: SortMode;
  showInactive: boolean;
  
  // Actions only
  setPeople: (people: Person[]) => void;
  setSelectedTeam: (team: TeamFilter) => void;
  setSearch: (search: string) => void;
  setSort: (sort: SortMode) => void;
  toggleShowInactive: () => void;
  promotePerson: (personId: string) => void;
  movePersonToTeam: (personId: string, team: Team) => void;
  toggleActive: (personId: string) => void;
}

export const useDirectoryStore = create<DirectoryStore>((set, get) => ({
  // Initial state
  peopleById: {},
  teamOrder: [TeamEnum.PLATFORM, TeamEnum.PRODUCT, TeamEnum.DESIGN, TeamEnum.SALES],
  selectedTeam: TeamFilter.ALL,
  search: '',
  sort: SortModeEnum.NAME_ASC,
  showInactive: true,
  
  // Actions
  setPeople: (people: Person[]) => {
    console.log("Store setPeople called with:", people);
    const normalized = normalizePeople(people);
    console.log("Normalized people:", normalized);
    set({ peopleById: normalized });
  },
  
  setSelectedTeam: (team: TeamFilter) => {
    set({ selectedTeam: team });
  },
  
  setSearch: (search: string) => {
    set({ search });
  },
  
  setSort: (sort: SortMode) => {
    set({ sort });
  },
  
  toggleShowInactive: () => {
    set((state) => ({ showInactive: !state.showInactive }));
  },
  
  promotePerson: (personId: string) => {
    const updatedPeople = promotePerson(get().peopleById, personId);
    if (updatedPeople !== get().peopleById) {
      set({ peopleById: updatedPeople });
    }
  },
  
  movePersonToTeam: (personId: string, team: Team) => {
    const updatedPeople = movePersonToTeam(get().peopleById, personId, team);
    if (updatedPeople !== get().peopleById) {
      set({ peopleById: updatedPeople });
    }
  },
  
  toggleActive: (personId: string) => {
    const updatedPeople = toggleActive(get().peopleById, personId);
    if (updatedPeople !== get().peopleById) {
      set({ peopleById: updatedPeople });
    }
  }
}));
