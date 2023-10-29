import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LayoutContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.div`
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  background: ${({ theme }) => theme.palette.background.default};
  padding: 1.5rem;

  width: 40rem;
  max-width: 80%;
`;
