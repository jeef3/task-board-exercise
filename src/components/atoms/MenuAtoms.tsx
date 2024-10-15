import styled from "styled-components";
import Button from "../Button";

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
  overflow: hidden;
  width: 200px;

  background: hsl(240 45% 80%);

  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-items: stretch;

  ${SidePanelTitle}, ${SidePanelContent}, ${SidePanelFooter} {
    padding: 8px;
  }
`;

export const BoardButtonContainer = styled(Button)<{ $editing?: boolean }>`
  position: ${({ $editing = false }) => ($editing ? "relative" : "unset")};
  z-index: ${({ $editing = false }) => ($editing ? "1" : "0")};
  padding: 2px;

  background: ${({ $editing }) =>
    $editing ? "white !important" : "transparent"};
  border-radius: 8px;

  display: grid;
  grid-template-columns: 1fr auto;
`;

export const BoardName = styled.div<{ $active?: boolean }>`
  padding: 4px;

  font-weight: ${({ $active = false }) => ($active ? 600 : 400)};
  color: ${({ $active = false }) => ($active ? "black" : "inherit")};

  display: grid;
`;
