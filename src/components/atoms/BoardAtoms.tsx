import styled from "styled-components";

export const BoardContainer = styled.div`
  overflow-x: auto;

  padding: 10px;

  list-style: none;

  background: red;

  > * {
    max-height: 100%;
    width: 100%;
  }
`;

export const BoardColumn = styled.article`
  overflow: hidden;
  width: 400px;
  max-height: 100%;

  border-radius: 10px;

  background: hsl(0 0% 95%);

  display: grid;
  grid-template-rows: [header] auto [tickets] 1fr [footer] auto;
`;

export const BoardColumnHeader = styled.header`
  padding: 8px 4px;

  display: flex;
  align-items: center;
  gap: 4px;

  * {
    font-size: 16px;
  }
`;

export const BoardColumnContent = styled.div`
  overflow: auto;

  padding: 4px;
`;

export const BoardColumnFooter = styled.footer`
  padding: 4px;
`;