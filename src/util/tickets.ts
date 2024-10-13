import { TicketStatus, type Ticket } from "../__generated__/graphql";

export function filter_visibleOnly(ticket: Ticket) {
  return ticket.visible;
}

export interface TicketBucket {
  name: string;
  status: TicketStatus;
  tickets: Ticket[];
}

export function reduce_bucketByStatus(buckets: TicketBucket[], ticket: Ticket) {
  const existingBucket = buckets.find(
    (bucket) => bucket.status === ticket.status,
  );

  if (!existingBucket) {
    // Create a new bucket with the status as a name
    buckets.push({
      name: ticket.status,
      status: ticket.status,
      tickets: [ticket],
    });
  } else {
    existingBucket.tickets.push(ticket);
  }

  return buckets;
}
