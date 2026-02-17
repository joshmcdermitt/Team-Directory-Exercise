import styled from '@emotion/styled';
import type { Person } from '../../models/types';
import { PersonCard } from './PersonCard';
import { EmptyState } from '../EmptyState';

interface TeamSectionProps {
  team: string;
  members: Person[];
  promotePerson: (id: string) => void;
  toggleActive: (id: string) => void;
  movePersonToTeam: (id: string, team: string) => void;
  isLoading?: boolean;
}

const TeamTitle = styled.h2`
  margin-bottom: 0.5rem;
`;

const PeopleGrid = styled.div`
  display: grid;
  gap: 0.625rem;
`;

export const TeamSection = ({ team, members, promotePerson, toggleActive, movePersonToTeam, isLoading = false }: TeamSectionProps) => {
  const hasPeople = members.length > 0;

  if (!hasPeople && !isLoading) {
    return (
      <div>
        <TeamTitle>{team}</TeamTitle>
        <EmptyState 
          title="No people in this team" 
          description="Try moving someone from another team or changing your filters"
          icon="👥"
        />
      </div>
    );
  }

  return (
    <div>
      <TeamTitle>{team}</TeamTitle>
      <PeopleGrid>
        {members.map((person) => (
          <PersonCard
            key={person.id}
            person={person}
            promotePerson={promotePerson}
            toggleActive={toggleActive}
            movePersonToTeam={movePersonToTeam}
            isLoading={isLoading}
          />
        ))}
      </PeopleGrid>
    </div>
  );
};
