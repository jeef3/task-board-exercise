import styled from "styled-components";

import type { Ticket as TTicket } from "../__generated__/graphql";
import { IconGripVertical } from "@tabler/icons-react";

const Container = styled.div`
  padding: 8px 8px 8px 0;

  border: solid 1px hsl(0 0% 90%);
  border-radius: 6px;

  background: hsl(0 0% 100%);

  display: grid;
  column-gap: 4px;
  grid-template-columns: [grip] auto [name] 1fr;
  grid-template-areas: "grip name" "grip description";
`;

const Grip = styled.div`
  grid-area: grip;
  align-self: stretch;

  cursor: grab;
  color: hsl(0 0% 80%);

  display: grid;
  align-items: center;
`;

const Name = styled.h3`
  grid-area: name;
  margin: 0;

  font-size: 14px;
`;

const Description = styled.p`
  grid-area: description;

  margin: 0;

  color: hsl(0 0% 80%);
  font-size: 12px;
`;

export default function Ticket({ ticket }: { ticket: TTicket }) {
  return (
    <Container>
      <Grip>
        <IconGripVertical size="1em" />
      </Grip>
      <Name>{ticket.name}</Name>
      <Description>{ticket.description || <em>No description</em>}</Description>
    </Container>
  );
}
