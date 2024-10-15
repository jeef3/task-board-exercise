import styled from "styled-components";

export const TicketContainer = styled.div`
  position: relative;
  padding: 8px 8px 8px 0;

  cursor: default;

  border: solid 1px hsl(0 0% 90%);
  border-radius: 6px;

  background: hsl(0 0% 100%);

  display: grid;
  column-gap: 4px;
  grid-template-columns: [grip] auto [content] 1fr;

  &:hover {
    background: hsl(0 0% 98%);
  }
`;

export const Grip = styled.div`
  align-self: stretch;

  cursor: grab;
  color: hsl(0 0% 80%);

  display: grid;
  align-items: center;
`;

export const TicketContent = styled.div<{ $editing?: boolean }>`
  min-height: ${({ $editing = false }) => ($editing ? "80px" : "0")};

  display: grid;
  grid-template-rows: auto 1fr;
`;

export const Name = styled.h3`
  margin: 0;

  font-size: 14px;
`;

export const Description = styled.p`
  margin: 0;

  color: hsl(0 0% 80%);
  font-size: 12px;
`;
