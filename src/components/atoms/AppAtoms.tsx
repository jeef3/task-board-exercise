import styled from "styled-components";

export const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;

  background: blue;

  display: grid;
  grid-template-rows: [header] auto [main] 1fr;
`;

export const AppHeaderContainer = styled.header`
  padding: 16px;

  color: hsl(0 0% 100%);
  background: hsl(0 0% 10%);

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AppBody = styled.main`
  display: grid;
  grid-template-rows: [board-header] auto [columns] 1fr;
`;
