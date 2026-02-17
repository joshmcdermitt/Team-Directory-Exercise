import styled from "@emotion/styled";

export const Container = styled.div`
  font-family: system-ui;
  padding: 16px;
  max-width: 1000px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  margin-top: 0;
`;

export const ControlsContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
`;

export const Label = styled.label`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const CheckboxLabel = styled(Label)`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const StatsContainer = styled.div`
  margin-top: 12px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const StatsGrid = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const StatCard = styled.div`
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 8px;
`;

export const TeamsContainer = styled.div`
  margin-top: 16px;
`;

export const TeamSection = styled.section`
  margin-bottom: 18px;
`;

export const TeamTitle = styled.h2`
  margin-bottom: 8px;
`;

export const NoResults = styled.div`
  color: #666;
`;

export const PeopleGrid = styled.div`
  display: grid;
  gap: 10px;
`;

export const PersonCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
`;

export const PersonInfo = styled.div`
  flex: 1;
`;

export const PersonHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PersonName = styled.strong`
  font-size: 16px;
`;

export const RoleLevelBadge = styled.span`
  font-size: 12px;
  border: 1px solid #ccc;
  padding: 2px 8px;
  border-radius: 999;
`;

export const StatusBadge = styled.span<{ isActive: boolean }>`
  font-size: 12px;
  color: ${props => props.isActive ? "green" : "crimson"};
`;

export const SkillsContainer = styled.div`
  margin-top: 6px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const SkillBadge = styled.span`
  font-size: 12px;
  border: 1px solid #eee;
  padding: 2px 8px;
  border-radius: 999;
  background: #fafafa;
`;

export const PersonMeta = styled.div`
  margin-top: 6px;
  color: #666;
  font-size: 12px;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Button = styled.button`
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const MoveTeamLabel = styled.label`
  font-size: 12px;
`;

export const TeamSelect = styled.select`
  display: block;
  margin-top: 4px;
`;

export const DebugContainer = styled.details`
  margin-top: 24px;
`;

export const DebugPre = styled.pre`
  background: #fafafa;
  padding: 12px;
  border-radius: 8px;
  overflow: auto;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: #666;
`;

export const ErrorContainer = styled.div`
  padding: 16px;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  color: #c33;
  margin: 16px 0;
`;

export const RetryButton = styled.button`
  margin-top: 12px;
  padding: 8px 16px;
  background: #c33;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background: #a22;
  }
  
  &:disabled {
    background: #999;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const DebugControls = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 1000;
`;

export const DebugButton = styled.button`
  padding: 6px 12px;
  background: #666;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background: #555;
  }
  
  &:disabled {
    background: #999;
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  &.error {
    background: #c33;
    
    &:hover:not(:disabled) {
      background: #a22;
    }
    
    &:disabled {
      background: #d66;
    }
  }
`;
