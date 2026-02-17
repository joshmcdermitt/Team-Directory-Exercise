import styled from '@emotion/styled';

const EmptyContainer = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const EmptyTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 500;
  color: #333;
`;

const EmptyDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
}

export const EmptyState = ({ title, description, icon = '📋' }: EmptyStateProps) => (
  <EmptyContainer>
    <EmptyIcon>{icon}</EmptyIcon>
    <EmptyTitle>{title}</EmptyTitle>
    {description && <EmptyDescription>{description}</EmptyDescription>}
  </EmptyContainer>
);
