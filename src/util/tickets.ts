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
  let bucket = buckets.find((b) => b.status === ticket.status);

  // Naive handling in case we meet an unexpected status.
  if (!bucket) {
    bucket = { name: ticket.status, status: ticket.status, tickets: [ticket] };
    buckets.push(bucket);

    return buckets;
  }

  bucket.tickets.push(ticket);

  return buckets;
}
