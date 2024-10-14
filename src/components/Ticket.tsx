import styled from "styled-components";

import type { Ticket as TTicket } from "../__generated__/graphql";
import { IconGripVertical } from "@tabler/icons-react";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";

const Container = styled.div`
  padding: 8px 8px 8px 0;

  border: solid 1px hsl(0 0% 90%);
  border-radius: 6px;

  background: hsl(0 0% 100%);

  display: grid;
  column-gap: 4px;
  grid-template-columns: [grip] auto [name] 1fr;
`;

const Grip = styled.div`
  align-self: stretch;

  cursor: grab;
  color: hsl(0 0% 80%);

  display: grid;
  align-items: center;
`;

const Name = styled.h3`
  margin: 0;

  font-size: 14px;
`;

const Description = styled.p`
  margin: 0;

  color: hsl(0 0% 80%);
  font-size: 12px;
`;

export default function Ticket({ ticket }: { ticket: TTicket }) {
  const [editing, setEditing] = useState(false);

  const stopEditing = () => {
    console.log("stop editing");
    setEditing(false);
    document.removeEventListener("click", stopEditing);
  };

  const handleClick = useCallback(() => {
    console.log("editing");
    setEditing(true);

    document.addEventListener("click", stopEditing);
  }, []);

  return (
    <Container>
      <Grip>
        <IconGripVertical size="1em" />
      </Grip>
      {editing ? (
        <div onClick={stopEditing}>
          <Name>{ticket.name} editing</Name>
          <Description>
            {ticket.description || <em>No description</em>}
          </Description>
        </div>
      ) : (
        <div style={{ cursor: "pointer" }} onClick={handleClick}>
          <Name>{ticket.name}</Name>
          <Description>
            {ticket.description || <em>No description</em>}
          </Description>
        </div>
      )}
    </Container>
  );
}
