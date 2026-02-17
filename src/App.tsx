import { useMemo, useReducer } from "react";
import type { Team } from "./models/types";
import { DirectoryActionType, TeamFilter, Team as TeamEnum } from "./models/types";
import { seedPeople } from "./data/seed";
import { normalizePeople } from "./utils/directory";
import {
  directoryReducer,
  initialDirectoryState,
} from "./state/directory.reducer";
import {
  selectDenormalizedPeople,
  selectVisiblePeople,
  selectGroupedByTeam,
  selectTeamStats,
} from "./state/directory.selectors";
import {
  Container,
  Title,
  ControlsContainer,
  Label,
  CheckboxLabel,
  StatsContainer,
  StatsGrid,
  StatCard,
  TeamsContainer,
  TeamSection,
  TeamTitle,
  NoResults,
  PeopleGrid,
  PersonCard,
  PersonInfo,
  PersonHeader,
  PersonName,
  RoleLevelBadge,
  StatusBadge,
  SkillsContainer,
  SkillBadge,
  PersonMeta,
  ActionsContainer,
  Button,
  MoveTeamLabel,
  TeamSelect,
  DebugContainer,
  DebugPre,
} from "./styles/App.styles";

export default function App() {
  const [state, dispatch] = useReducer(
    directoryReducer,
    undefined,
    () => ({
      ...initialDirectoryState,
      peopleById: normalizePeople(seedPeople),
    })
  );

  const allPeople = useMemo(() => selectDenormalizedPeople(state), [state]);
  const visiblePeople = useMemo(() => selectVisiblePeople(state), [state]);
  const grouped = useMemo(() => selectGroupedByTeam(state), [state]);
  const stats = useMemo(() => selectTeamStats(state), [state]);

  return (
    <Container>
      <Title>Team Directory</Title>

      {/* Controls */}
      <ControlsContainer>
        <Label>
          Team{" "}
          <select
            value={state.selectedTeam}
            onChange={(e) =>
              dispatch({ type: DirectoryActionType.SET_TEAM, team: e.target.value as any })
            }
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
            value={state.search}
            onChange={(e) => dispatch({ type: DirectoryActionType.SET_SEARCH, search: e.target.value })}
            placeholder="name or skill..."
          />
        </Label>

        <Label>
          Sort{" "}
          <select
            value={state.sort}
            onChange={(e) =>
              dispatch({ type: DirectoryActionType.SET_SORT, sort: e.target.value as any })
            }
          >
            <option value="NAME_ASC">Name A-Z</option>
            <option value="LEVEL_DESC">Level high-low</option>
          </select>
        </Label>

        <CheckboxLabel>
          <input
            type="checkbox"
            checked={state.showInactive}
            onChange={() => dispatch({ type: DirectoryActionType.TOGGLE_SHOW_INACTIVE })}
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
      <TeamsContainer>
        {grouped.map(({ team, members }) => (
          <TeamSection key={team}>
            <TeamTitle>{team}</TeamTitle>

            {members.length === 0 ? (
              <NoResults>No results</NoResults>
            ) : (
              <PeopleGrid>
                {members.map((p) => (
                  <PersonCard key={p.id}>
                    <PersonInfo>
                      <PersonHeader>
                        <PersonName>{p.name}</PersonName>
                        <RoleLevelBadge>
                          {p.role} L{p.level}
                        </RoleLevelBadge>
                        <StatusBadge isActive={p.isActive}>
                          {p.isActive ? "Active" : "Inactive"}
                        </StatusBadge>
                      </PersonHeader>

                      <SkillsContainer>
                        {p.skills.map((s) => (
                          <SkillBadge key={s}>
                            {s}
                          </SkillBadge>
                        ))}
                      </SkillsContainer>
                      {p?.reportsToId !== undefined && (
                        <PersonMeta>
                        Reports To: {members.find((m) => m.id === p.reportsToId)?.name}
                      </PersonMeta>
                      )}
                      <PersonMeta>
                        Team: {p.team}
                      </PersonMeta>
                    </PersonInfo>

                    <ActionsContainer>
                      <Button disabled={!p.isActive} onClick={() => dispatch({ type: DirectoryActionType.PROMOTE, personId: p.id })}>
                        Promote
                      </Button>
                      <Button onClick={() => dispatch({ type: DirectoryActionType.TOGGLE_ACTIVE, personId: p.id })}>
                        Toggle active
                      </Button>

                      <MoveTeamLabel>
                        Move team
                        <TeamSelect
                          value={p.team}
                          onChange={(e) =>
                            dispatch({
                              type: DirectoryActionType.MOVE_TEAM,
                              personId: p.id,
                              team: e.target.value as Team,
                            })
                          }
                        >
                          {Object.values(TeamEnum).map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </TeamSelect>
                      </MoveTeamLabel>
                    </ActionsContainer>
                  </PersonCard>
                ))}
              </PeopleGrid>
            )}
          </TeamSection>
        ))}
      </TeamsContainer>

      {/* Debug */}
      <DebugContainer>
        <summary>Debug</summary>
        <DebugPre>
          {JSON.stringify({ state, allPeople, visiblePeople }, null, 2)}
        </DebugPre>
      </DebugContainer>
    </Container>
  );
}
