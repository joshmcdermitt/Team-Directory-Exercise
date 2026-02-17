import styled from '@emotion/styled';
import type { Person } from '../../models/types';
import { MAX_LEVEL } from '../../constants';
import { COLORS } from '../../constants/colors';
import { UI_TEXT } from '../../constants/ui';

interface PersonCardProps {
  person: Person;
  promotePerson: (id: string) => void;
  toggleActive: (id: string) => void;
  movePersonToTeam: (id: string, team: string) => void;
  isLoading?: boolean;
}

const Card = styled.div<{ isLoading?: boolean }>`
  border: 1px solid ${props => props.isLoading ? COLORS.BORDER_LIGHT : COLORS.BORDER_DEFAULT};
  border-radius: 0.625rem;
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: flex-start;
  background: ${props => props.isLoading ? COLORS.SKELETON_LOADING : COLORS.WHITE};
  transition: all 0.2s ease;
`;

const CardInfo = styled.div`
  flex: 1;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.375rem;
`;

const PersonName = styled.strong`
  font-size: 1rem;
`;

const RoleLevelBadge = styled.span`
  font-size: 0.75rem;
  border: 1px solid ${COLORS.BORDER_ROLE};
  padding: 0.125rem 0.5rem;
  border-radius: 999;
`;

const StatusBadge = styled.span<{ isActive: boolean }>`
  font-size: 0.75rem;
  color: ${props => props.isActive ? COLORS.ACTIVE : COLORS.INACTIVE};
`;

const SkillsContainer = styled.div`
  margin-top: 0.375rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

const SkillBadge = styled.span`
  font-size: 0.75rem;
  border: 1px solid ${COLORS.BORDER_SKILL};
  padding: 0.125rem 0.5rem;
  border-radius: 999;
  background: ${COLORS.SKELETON_LOADING};
`;

const PersonMeta = styled.div`
  margin-top: 0.375rem;
  color: ${COLORS.TEXT_MUTED};
  font-size: 0.75rem;
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Button = styled.button`
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const MoveTeamLabel = styled.label`
  font-size: 12px;
`;

const TeamSelect = styled.select`
  display: block;
`;

const SkeletonText = styled.div<{ width?: string; height?: string }>`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
  width: ${props => props.width || '60px'};
  height: ${props => props.height || '16px'};
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const SkeletonBadge = styled(SkeletonText)`
  width: 80px;
  height: 20px;
`;

export const PersonCard = ({ person, promotePerson, toggleActive, movePersonToTeam, isLoading = false }: PersonCardProps) => {
  if (isLoading) {
    return (
      <Card isLoading>
        <CardInfo>
          <CardHeader>
            <SkeletonText width="120px" height="16px" />
            <SkeletonBadge width="80px" height="20px" />
            <SkeletonBadge width="60px" height="20px" />
          </CardHeader>
          
          <div style={{ display: 'flex', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <SkeletonText width="60px" height="12px" />
            <SkeletonText width="80px" height="12px" />
            <SkeletonText width="70px" height="12px" />
          </div>
          
          <SkeletonText width="100px" height="12px" style={{ marginBottom: '6px' }} />
          <SkeletonText width="80px" height="12px" style={{ marginBottom: '12px' }} />
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <SkeletonText width="60px" height="32px" />
            <SkeletonText width="80px" height="32px" />
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
              <SkeletonText width="80px" height="12px" style={{ marginRight: '8px' }} />
              <SkeletonText width="100px" height="32px" />
            </div>
          </div>
        </CardInfo>
      </Card>
    );
  }

  return (
    <Card>
      <CardInfo>
        <CardHeader>
          <PersonName>{person.name}</PersonName>
          <RoleLevelBadge>
            {person.role} {UI_TEXT.LEVEL_PREFIX}{person.level}
          </RoleLevelBadge>
          <StatusBadge isActive={person.isActive}>
            {person.isActive ? UI_TEXT.ACTIVE : UI_TEXT.INACTIVE}
          </StatusBadge>
        </CardHeader>

        <SkillsContainer>
          {person.skills.map((skill) => (
            <SkillBadge key={skill}>{skill}</SkillBadge>
          ))}
        </SkillsContainer>

        {person.reportsToId && (
          <PersonMeta>
            {UI_TEXT.REPORTS_TO} {person.reportsToId}
          </PersonMeta>
        )}
        <PersonMeta>
          {UI_TEXT.TEAM} {person.team}
        </PersonMeta>
      </CardInfo>

      <ActionsContainer>
        <Button 
          disabled={!person.isActive || person.level >= MAX_LEVEL} 
          onClick={() => promotePerson(person.id)}
        >
          {UI_TEXT.PROMOTE}
        </Button>
        <Button onClick={() => toggleActive(person.id)}>
          {UI_TEXT.TOGGLE_ACTIVE}
        </Button>

        <MoveTeamLabel>
          {UI_TEXT.MOVE_TEAM}
          <TeamSelect
            value={person.team}
            onChange={(e) => movePersonToTeam(person.id, e.target.value)}
          >
            <option value="Platform">Platform</option>
            <option value="Product">Product</option>
            <option value="Design">Design</option>
            <option value="Sales">Sales</option>
          </TeamSelect>
        </MoveTeamLabel>
      </ActionsContainer>
    </Card>
  );
};
