import { useEffect, useMemo, useState } from "react";
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
import { useCurrentOrg } from "../hooks/hooks";
import { BoxLoader, TextLoader } from "./ContentLoader";

const makeInitialBuckets = (): TicketBucket[] => [
  { name: "To Do", status: TicketStatus.Todo, tickets: [] },
  { name: "In Progress", status: TicketStatus.Inprogress, tickets: [] },
  { name: "Done", status: TicketStatus.Done, tickets: [] },
];

export default function BoardStatusColumns({
  board,
}: {
  board: TBoard | null;
}) {
  const buckets = useMemo(
    () =>
      board?.tickets
        .filter(filter_visibleOnly)
        .reduce(reduce_bucketByStatus, makeInitialBuckets()),
    [board?.tickets],
  );

  return (
    <BoardContainer>
      <UnstyledList as="ol" $gutter={10}>
        {buckets ? (
          buckets.map((bucket) => (
            <li key={bucket.status}>
              <BoardColumn>
                <BoardColumnHeader>
                  <h3>{bucket.name}</h3>
                  <div>{bucket.tickets.length}</div>
                </BoardColumnHeader>

                <BoardColumnContent>
                  {!bucket.tickets.length ? (
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: 18,
                        color: "hsl(240 10% 75% )",
                      }}
                    >
                      No tickets!
                    </div>
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
          ))
        ) : (
          <>
            <li>
              <ColumnLoading />
            </li>
            <li>
              <ColumnLoading />
            </li>
            <li>
              <ColumnLoading />
            </li>
          </>
        )}
      </UnstyledList>
    </BoardContainer>
  );
}

function ColumnLoading() {
  const ticketCount = useMemo(() => Math.ceil(Math.random() * 5), []);

  return (
    <BoardColumn>
      <BoardColumnHeader>
        <TextLoader width={120} />
      </BoardColumnHeader>
      <BoardColumnContent>
        <UnstyledList as="ul" $direction="column">
          {Array.from(Array(ticketCount)).map(() => (
            <li>
              <BoxLoader height={50} radius={6} />
            </li>
          ))}
        </UnstyledList>
      </BoardColumnContent>
      <BoardColumnFooter></BoardColumnFooter>
    </BoardColumn>
  );
}
