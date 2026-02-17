import styled from '@emotion/styled';
import { TEAM_ORDER } from '../constants';

const SkeletonCard = styled.div`
  background: #f5f5f5;
  border-radius: 10px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
`;

const SkeletonHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
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

const SkeletonInfo = styled.div`
  flex: 1;
`;

export const PersonCardSkeleton = () => (
  <SkeletonCard>
    <SkeletonInfo>
      <SkeletonHeader>
        <SkeletonText width="120px" height="16px" />
        <SkeletonBadge width="80px" height="20px" />
        <SkeletonBadge width="60px" height="20px" />
      </SkeletonHeader>
      
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
    </SkeletonInfo>
  </SkeletonCard>
);

export const TeamSectionSkeleton = () => (
  <div>
    <SkeletonText width="100px" height="24px" style={{ marginBottom: '8px' }} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '10px' }}>
      <PersonCardSkeleton />
      <PersonCardSkeleton />
      <PersonCardSkeleton />
      <PersonCardSkeleton />
    </div>
  </div>
);

export const LoadingSkeleton = () => (
  <div style={{ padding: '20px' }}>
    {TEAM_ORDER.map(team => (
      <TeamSectionSkeleton key={team} />
    ))}
  </div>
);
