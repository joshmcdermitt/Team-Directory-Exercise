import styled from '@emotion/styled';
import type { Person } from '../../models/types';
import { TeamSection } from './TeamSection';
import { COLORS } from '../../constants/colors';

interface PeopleGridProps {
  grouped: { team: string; members: Person[] }[];
  promotePerson: (id: string) => void;
  toggleActive: (id: string) => void;
  movePersonToTeam: (id: string, team: string) => void;
  isLoading?: boolean;
}

const TeamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SkeletonText = styled.div<{ width?: string; height?: string }>`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 0.25rem;
  width: ${props => props.width || '60px'};
  height: ${props => props.height || '1rem'};
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const SkeletonCard = styled.div`
  background: ${COLORS.SKELETON_BG};
  border-radius: 0.625rem;
  padding: 0.75rem;
  border: 1px solid ${COLORS.BORDER_LIGHT};
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: flex-start;
`;

const SkeletonInfo = styled.div`
  flex: 1;
`;

const SkeletonHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.375rem;
`;

const SkeletonBadge = styled(SkeletonText)`
  width: 80px;
  height: 1.25rem;
`;

const SkeletonSkills = styled.div`
  display: flex;
  gap: 0.375rem;
  margin-bottom: 0.375rem;
  flex-wrap: wrap;
`;

const SkeletonActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SkeletonActionRight = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TeamTitle = styled.h2`
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
`;

const SkeletonGrid = styled.div`
  display: grid;
  gap: 0.625rem;
`;

const TeamSectionContainer = styled.div``;

const PersonCardSkeleton = () => (
  <SkeletonCard>
    <SkeletonInfo>
      <SkeletonHeader>
        <SkeletonText width="120px" height="1rem" />
        <SkeletonBadge width="80px" height="1.25rem" />
        <SkeletonBadge width="60px" height="1.25rem" />
      </SkeletonHeader>
      <SkeletonSkills>
        <SkeletonText width="60px" height="0.75rem" />
        <SkeletonText width="80px" height="0.75rem" />
        <SkeletonText width="70px" height="0.75rem" />
      </SkeletonSkills>
      <SkeletonText width="100px" height="0.75rem" />
      <SkeletonText width="80px" height="0.75rem" />
      <SkeletonActions>
        <SkeletonText width="60px" height="2rem" />
        <SkeletonText width="80px" height="2rem" />
        <SkeletonActionRight>
          <SkeletonText width="80px" height="0.75rem" />
          <SkeletonText width="100px" height="2rem" />
        </SkeletonActionRight>
      </SkeletonActions>
    </SkeletonInfo>
  </SkeletonCard>
);



const TeamSectionSkeleton = ({ team }: { team: string }) => (
  <TeamSectionContainer>
    <TeamTitle>{team}</TeamTitle>
    <SkeletonGrid>
      <PersonCardSkeleton />
      <PersonCardSkeleton />
      <PersonCardSkeleton />
      <PersonCardSkeleton />
    </SkeletonGrid>
  </TeamSectionContainer>
);

export const PeopleGrid = ({ grouped, promotePerson, toggleActive, movePersonToTeam, isLoading = false }: PeopleGridProps) => {
  return (
    <TeamsContainer>
      {grouped.map(({ team, members }) => {
        if (isLoading) {
          return <TeamSectionSkeleton key={team} team={team} />;
        }
        
        return (
          <TeamSection
            key={team}
            team={team}
            members={members}
            promotePerson={promotePerson}
            toggleActive={toggleActive}
            movePersonToTeam={movePersonToTeam}
          />
        );
      })}
    </TeamsContainer>
  );
};
