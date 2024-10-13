import styled from "styled-components";

import type { Ticket as TTicket } from "../__generated__/graphql";

const Container = styled.div`
  padding: 8px;

  border: solid 1px hsl(0 0% 90%);
  border-radius: 6px;

  background: hsl(0 0% 100%);
`;

const Title = styled.h3`
  margin: 0;

  font-size: 14px;
`;

const Description = styled.p`
  margin: 0;

  color: hsl(0 0% 80%);
  font-size: 14px;
`;

export default function Ticket({ ticket }: { ticket: TTicket }) {
  return (
    <Container>
      <Title>{ticket.name}</Title>
      <Description>{ticket.description}</Description>
      <button
        onClick={() =>
          handleShowAddEditTicketClick(board as Board, ticket as Ticket)
        }
      >
        Edit ticket
      </button>
      <button
        onClick={() =>
          handleShowDeleteTicketClick(
            organisation.id,
            board.id,
            ticket as Ticket,
          )
        }
      >
        Delete ticket
      </button>
    </Container>
  );
}
