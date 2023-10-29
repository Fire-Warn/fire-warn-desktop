import styled from 'styled-components';

import Paper from '@mui/material/Paper';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  overflow: auto;
  background: ${({ theme }) => theme.palette.background.default};
`;

export const Content = styled.div``;

export const ContentLarge = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 1fr min-content;
  grid-template-areas:
    'sidebar children'
    'sidebar footer';
  overflow: hidden;
`;

export const ChildrenWrapperLarge = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    padding: 0.5rem;
  }
`;

export const ChildrenWrapper = styled.div`
  padding: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    padding: 0.5rem;
  }
`;

export const SideBarHolder = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow: auto;

  .MuiList-root {
    display: flex;
    flex-direction: column;
    > *:not(:first-child) {
      margin-top: 0.5rem;
    }
  }
`;
