import { useEffect, useMemo, useState } from "react";
import { TeamFilter, SortMode } from "./models/types";
import { usePeople } from "./hooks/usePeople";
import { ApiService } from "./services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useDirectoryStore } from "./store/directoryStore";
import { useTeamStats } from "./hooks/useTeamStats";
import { useFilteredPeople } from "./hooks/useFilteredPeople";
import { PeopleGrid } from "./components/ui/PeopleGrid";
import { SEARCH_PLACEHOLDER } from "./constants";
import { debugLog } from "./utils/helpers";
import {
  Container,
  Title,
  ControlsContainer,
  Label,
  CheckboxLabel,
  StatsContainer,
  StatsGrid,
  StatCard,
  DebugContainer,
  DebugPre,
  ErrorContainer,
  RetryButton,
  DebugControls,
  DebugButton,
} from "./styles/App.styles";

export default function App() {
  const { data: people, isLoading, error, refetch, isFetching } = usePeople();
  const queryClient = useQueryClient();
  
  // Debug state for forcing skeleton loading
  const [forceLoading, setForceLoading] = useState(false);
  
  // Zustand store - use individual selectors to prevent infinite loops
  const setPeople = useDirectoryStore(state => state.setPeople);
  const selectedTeam = useDirectoryStore(state => state.selectedTeam);
  const setSelectedTeam = useDirectoryStore(state => state.setSelectedTeam);
  const search = useDirectoryStore(state => state.search);
  const setSearch = useDirectoryStore(state => state.setSearch);
  const sort = useDirectoryStore(state => state.sort);
  const setSort = useDirectoryStore(state => state.setSort);
  const showInactive = useDirectoryStore(state => state.showInactive);
  const toggleShowInactive = useDirectoryStore(state => state.toggleShowInactive);
  const promotePerson = useDirectoryStore(state => state.promotePerson);
  const movePersonToTeam = useDirectoryStore(state => state.movePersonToTeam);
  const toggleActive = useDirectoryStore(state => state.toggleActive);
  const peopleById = useDirectoryStore(state => state.peopleById);

  // Computed values - compute locally to prevent infinite loops
  const allPeople = useMemo(() => Object.values(peopleById), [peopleById]);

  // Use optimized custom hooks
  const stats = useTeamStats(allPeople);
  const { visiblePeople, grouped } = useFilteredPeople(
    allPeople, 
    selectedTeam, 
    search, 
    showInactive, 
    sort
  );

  // Update store when people data changes
  useEffect(() => {
    if (people) {
      debugLog("Setting people in store:", people);
      setPeople(people);
    }
  }, [people, setPeople]);

  const handleSimulateError = () => {
    debugLog("Simulating error");
    ApiService.setForceError(true);
    // Reset the query to clear any previous error state, then refetch
    queryClient.resetQueries({ queryKey: ["people"] });
    refetch();
  };

  const handleResetAll = () => {
    debugLog("Resetting all changes");
    // Reset all store state to initial values
    setSelectedTeam(TeamFilter.ALL);
    setSearch('');
    setSort(SortMode.NAME_ASC);
    toggleShowInactive(); // Toggle twice to get back to true
    toggleShowInactive();
    
    // Refetch fresh data from API
    queryClient.resetQueries({ queryKey: ["people"] });
    refetch();
  };

  debugLog("App state:", { allPeople, visiblePeople, grouped, stats });

  // Show error state
  if (error) {
    return (
      <Container>
        <Title>Team Directory</Title>
        <ErrorContainer>
          <strong>Error:</strong> {error.message}
          <br />
          Please try again later.
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <RetryButton 
              onClick={() => {
                console.log("Retry clicked");
                // Reset the query to clear any previous error state, then refetch
                queryClient.resetQueries({ queryKey: ["people"] });
                refetch();
              }}
              disabled={isFetching}
            >
              Retry {isFetching ? '...' : ''}
            </RetryButton>
            <RetryButton 
              onClick={() => {
                console.log("Reset & Retry clicked");
                ApiService.setForceError(false);
                // Reset the query to clear any previous error state, then refetch
                queryClient.resetQueries({ queryKey: ["people"] });
                refetch();
              }}
              disabled={isFetching}
            >
              Reset & Retry {isFetching ? '...' : ''}
            </RetryButton>
          </div>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Team Directory</Title>

      {/* Debug Controls */}
      <DebugControls>
        <div style={{ fontSize: '12px', marginBottom: '8px' }}>Debug:</div>
        <DebugButton 
          onClick={handleSimulateError} 
          className="error"
          disabled={isFetching}
        >
          Simulate Error
        </DebugButton>
        <DebugButton 
          onClick={handleResetAll}
          disabled={isFetching}
          style={{ marginLeft: '8px' }}
        >
          Reset All
        </DebugButton>
        <DebugButton 
          onClick={() => setForceLoading(!forceLoading)}
          disabled={isFetching}
          style={{ marginLeft: '8px' }}
        >
          Skeleton: {forceLoading ? 'ON' : 'OFF'}
        </DebugButton>
      </DebugControls>

      {/* Controls */}
      <ControlsContainer>
        <Label>
          Team{" "}
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value as TeamFilter)}
          >
            <option value={TeamFilter.ALL}>All</option>
            {Object.values(TeamFilter).filter(value => value !== TeamFilter.ALL).map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </Label>

        <Label>
          Search{" "}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={SEARCH_PLACEHOLDER}
          />
        </Label>

        <Label>
          Sort{" "}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
          >
            <option value={SortMode.NAME_ASC}>Name A-Z</option>
            <option value={SortMode.LEVEL_DESC}>Level high-low</option>
          </select>
        </Label>

        <CheckboxLabel>
          <input
            type="checkbox"
            checked={showInactive}
            onChange={() => toggleShowInactive()}
          />
          Show inactive
        </CheckboxLabel>
      </ControlsContainer>

      {/* Stats */}
      <StatsContainer>
        <strong>Team stats</strong>
        <StatsGrid>
          {Object.entries(stats).map(([team, s]) => (
            <StatCard key={team}>
              <div><strong>{team}</strong></div>
              <div>{s.total} total ({s.active} active)</div>
              <div>{s.managers} managers/directors</div>
              <div>avg level {s.avgLevel}</div>
            </StatCard>
          ))}
        </StatsGrid>
      </StatsContainer>

      {/* Render grouped teams */}
      <PeopleGrid
        grouped={grouped}
        promotePerson={promotePerson}
        toggleActive={toggleActive}
        movePersonToTeam={(id, team) => movePersonToTeam(id, team as any)}
        isLoading={isLoading || forceLoading}
      />

      {/* Debug */}
      <DebugContainer>
        <summary>Debug</summary>
        <DebugPre>
          {JSON.stringify({ selectedTeam, search, sort, showInactive, allPeople, visiblePeople }, null, 2)}
        </DebugPre>
      </DebugContainer>
    </Container>
  );
}
