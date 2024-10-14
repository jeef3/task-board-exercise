import styled from "styled-components";

export const BoardContainer = styled.div`
  overflow-x: auto;

  padding: 10px;

  list-style: none;

  > * {
    max-height: 100%;
    width: 100%;
  }
`;

export const Column = styled.article`
  overflow: hidden;
  width: 300px;
  max-height: 100%;

  border-radius: 10px;

  background: hsl(240 10% 90%);
  box-shadow: 0 2px 2px hsl(0 0% 0% / 25%);

  display: grid;
  grid-template-rows: [header] auto [tickets] 1fr [footer] auto;
`;

export const ColumnHeader = styled.header`
  padding: 8px;

  display: flex;
  align-items: center;
  gap: 4px;

  * {
    font-size: 16px;
  }
`;

export const ColumnContent = styled.div`
  overflow: auto;

  padding: 0 8px;
`;

export const ColumnFooter = styled.footer`
  padding: 8px;

  display: grid;
`;
