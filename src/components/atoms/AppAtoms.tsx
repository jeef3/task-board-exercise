import styled from "styled-components";

export const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;

  background: hsl(240 10% 98%);

  display: grid;
  grid-template-rows: [header] auto [main] 1fr;
`;

export const AppHeaderContainer = styled.header`
  padding: 16px;

  color: hsl(0 0% 100%);
  background: hsl(240 45% 25%);

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AppBody = styled.main`
  overflow: hidden;

  display: grid;
  grid-template-columns: [board-header] auto [columns] 1fr;
`;
