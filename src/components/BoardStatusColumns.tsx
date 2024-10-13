import { useMemo } from "react";
import { IconSquarePlus } from "@tabler/icons-react";

import { type Board as TBoard, TicketStatus } from "../__generated__/graphql";
import {
  filter_visibleOnly,
  reduce_bucketByStatus,
  TicketBucket,
} from "../util/tickets";
import UnstyledList from "./atoms/UnstyledList";
import {
  BoardColumn,
  BoardColumnContent,
  BoardColumnFooter,
  BoardColumnHeader,
  BoardContainer,
} from "./atoms/BoardAtoms";
import Button from "./Button";
import Ticket from "./Ticket";

export default function BoardStatusColumns({ board }: { board: TBoard }) {
  const initialBuckets: TicketBucket[] = useMemo(
    () => [
      { name: "To Do", status: TicketStatus.Todo, tickets: [] },
      { name: "In Progress", status: TicketStatus.Inprogress, tickets: [] },
      { name: "Done", status: TicketStatus.Done, tickets: [] },
    ],
    [],
  );

  const buckets = useMemo(
    () =>
      board.tickets
        .filter(filter_visibleOnly)
        .reduce(reduce_bucketByStatus, initialBuckets),
    [board.tickets, initialBuckets],
  );

  return (
    <BoardContainer>
      <UnstyledList as="ol">
        {buckets.map((bucket) => (
          <li key={bucket.status}>
            <BoardColumn>
              <BoardColumnHeader>
                <h3>{bucket.name}</h3>
                <div>{bucket.tickets.length}</div>
              </BoardColumnHeader>

              <BoardColumnContent>
                {!bucket.tickets.length ? (
                  <div>This status as no tickets, yet!</div>
                ) : (
                  <UnstyledList as="ul" $direction="column">
                    {bucket.tickets.map((t) => (
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
