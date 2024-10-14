import styled from "styled-components";

export const SidePanelTitle = styled.h3``;

export const SidePanelContent = styled.div`
  border-top: solid 1px;
  border-bottom: solid 1px;
  border-color: hsl(0 0% 0% / 10%);
`;

export const SidePanelFooter = styled.div`
  display: grid;
`;

export const SidePanel = styled.aside`
  width: 200px;

  background: hsl(240 45% 80%);

  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-items: stretch;

  ${SidePanelTitle}, ${SidePanelContent}, ${SidePanelFooter} {
    padding: 8px;
  }
`;
