import styled from 'styled-components';
import TextField from '@mui/material/TextField';

export const AuthForm = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const StyledPrivacyContainer = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  background-color: white;
  z-index: 1000;
  padding: 20px;
`;

export const PrivacyContent = styled.div`
  padding: 20px;
`;

export const WTextField = styled(TextField).attrs({
  fullWidth: true,
  variant: 'outlined',
})``;
