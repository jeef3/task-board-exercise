import { useMemo } from "react";
import { IconSquarePlus } from "@tabler/icons-react";

import { TicketStatus } from "../__generated__/graphql";
import {
  filter_visibleOnly,
  reduce_bucketByStatus,
  TicketBucket,
} from "../util/tickets";
import UnstyledList from "./atoms/UnstyledList";
import {
  Column,
  ColumnContent,
  ColumnFooter,
  ColumnHeader,
  BoardContainer,
} from "./atoms/BoardAtoms";
import Button from "./Button";
import Ticket from "./Ticket";
import { BoxLoader, TextLoader } from "./ContentLoader";
import useCurrentBoard from "../hooks/useCurrentBoard";
import { EmptyLabel, TicketCount } from "./atoms/Text";

const makeInitialBuckets = (): TicketBucket[] => [
  { name: "To Do", status: TicketStatus.Todo, tickets: [] },
  { name: "In Progress", status: TicketStatus.Inprogress, tickets: [] },
  { name: "Done", status: TicketStatus.Done, tickets: [] },
];

export default function Board() {
  const [board] = useCurrentBoard();

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
              <Column>
                <ColumnHeader>
                  <h3>{bucket.name}</h3>
                  <TicketCount>{bucket.tickets.length}</TicketCount>
                </ColumnHeader>

                <ColumnContent>
                  {!bucket.tickets.length ? (
                    <EmptyLabel>This list is empty</EmptyLabel>
                  ) : (
                    <UnstyledList as="ul" $direction="column">
                      {bucket.tickets.map((t) => (
                        <li key={t.id}>
                          <Ticket ticket={t} />
                        </li>
                      ))}
                    </UnstyledList>
                  )}
                </ColumnContent>

                <ColumnFooter>
                  <Button $type="transparent">
                    <IconSquarePlus size="16" /> Add ticket
                  </Button>
                </ColumnFooter>
              </Column>
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
    <Column>
      <ColumnHeader>
        <TextLoader width={120} />
      </ColumnHeader>
      <ColumnContent>
        <UnstyledList as="ul" $direction="column">
          {Array.from(Array(ticketCount)).map((_, i) => (
            <li key={`loading-${i}`}>
              <BoxLoader height={50} radius={6} />
            </li>
          ))}
        </UnstyledList>
      </ColumnContent>
      <ColumnFooter></ColumnFooter>
    </Column>
  );
}
