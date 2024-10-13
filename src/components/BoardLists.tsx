import { useMemo } from "react";
import { IconSquarePlus } from "@tabler/icons-react";

import Ticket from "./Ticket";

import { type Board as TBoard, TicketStatus } from "../__generated__/graphql";
import {
  filter_visibleOnly,
  reduce_bucketByStatus,
  TicketBucket,
} from "../util/tickets";
import UnstyledList from "./atoms/UnstyledList";
import Button from "./Button";
import {
  BoardColumn,
  BoardColumnContent,
  BoardColumnFooter,
  BoardColumnHeader,
  BoardContainer,
} from "./atoms/Board";

export default function BoardLists({ board }: { board: TBoard }) {
  const initialColumns: TicketBucket[] = useMemo(
    () => [
      { name: "To Do", status: TicketStatus.Todo, tickets: [] },
      { name: "In Progress", status: TicketStatus.Inprogress, tickets: [] },
      { name: "Done", status: TicketStatus.Done, tickets: [] },
    ],
    [],
  );

  const columns = useMemo(
    () =>
      board.tickets
        .filter(filter_visibleOnly)
        .reduce(reduce_bucketByStatus, initialColumns),
    [board.tickets, initialColumns],
  );

  return (
    <BoardContainer>
      <UnstyledList as="ol">
        {columns.map((column) => (
          <li>
            <BoardColumn key={column.status}>
              <BoardColumnHeader>
                <h3>{column.name}</h3>
                <div>{column.tickets.length}</div>
              </BoardColumnHeader>

              <BoardColumnContent>
                {!board.tickets.length ? (
                  <div>This board as no tickets, yet!</div>
                ) : (
                  <UnstyledList as="ul" $direction="column">
                    {board.tickets.map((t) => (
                      <li key={t.id}>
                        <Ticket ticket={t} />
                      </li>
                    ))}
                  </UnstyledList>
                )}
              </BoardColumnContent>

              <BoardColumnFooter>
                <Button $type="transparent">
                  <IconSquarePlus size="16" /> Add ticket
                </Button>
              </BoardColumnFooter>
            </BoardColumn>
          </li>
        ))}
      </UnstyledList>
    </BoardContainer>
  );
}
