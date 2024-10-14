import { describe, expect, test } from "vitest";

import { Ticket, TicketStatus } from "../__generated__/graphql";
import { filter_visibleOnly, reduce_bucketByStatus } from "./tickets";

describe("Tickets", () => {
  describe("filter_visibleOnly", () => {
    test("Can filter visible tickets", () => {
      const tickets = [
        { name: "Visible ticket", visible: true },
        { name: "Invisible ticket", visible: false },
      ] as Ticket[];

      const visibleTickets = tickets.filter(filter_visibleOnly);

      expect(visibleTickets).toMatchObject([
        { name: "Visible ticket", visible: true },
      ]);
    });
  });

  describe("reduce_bucketBtStatus", () => {
    test("Can bucket tickets by status", () => {
      const tickets = [
        { name: "Todo ticket", status: TicketStatus.Todo },
        { name: "In-progress ticket", status: TicketStatus.Inprogress },
        { name: "Done ticket", status: TicketStatus.Done },
      ] as Ticket[];

      const ticketBuckets = tickets.reduce(reduce_bucketByStatus, []);

      expect(ticketBuckets).toMatchObject([
        {
          name: "TODO",
          status: TicketStatus.Todo,
          tickets: [{ name: "Todo ticket", status: TicketStatus.Todo }],
        },
        {
          name: "INPROGRESS",
          status: TicketStatus.Inprogress,
          tickets: [
            { name: "In-progress ticket", status: TicketStatus.Inprogress },
          ],
        },
        {
          name: "DONE",
          status: TicketStatus.Done,
          tickets: [{ name: "Done ticket", status: TicketStatus.Done }],
        },
      ]);
    });

    test("Can bucket tickets into an existing bucket array", () => {
      const tickets = [
        { name: "Todo ticket", status: TicketStatus.Todo },
        { name: "In-progress ticket", status: TicketStatus.Inprogress },
        { name: "Done ticket", status: TicketStatus.Done },
      ] as Ticket[];

      const initialColumns = [
        { name: "To Do", status: TicketStatus.Todo, tickets: [] },
        { name: "In Progress", status: TicketStatus.Inprogress, tickets: [] },
        { name: "Done", status: TicketStatus.Done, tickets: [] },
      ];

      const ticketBuckets = tickets.reduce(
        reduce_bucketByStatus,
        initialColumns,
      );

      expect(ticketBuckets).toMatchObject([
        {
          name: "To Do",
          status: TicketStatus.Todo,
          tickets: [{ name: "Todo ticket", status: TicketStatus.Todo }],
        },
        {
          name: "In Progress",
          status: TicketStatus.Inprogress,
          tickets: [
            { name: "In-progress ticket", status: TicketStatus.Inprogress },
          ],
        },
        {
          name: "Done",
          status: TicketStatus.Done,
          tickets: [{ name: "Done ticket", status: TicketStatus.Done }],
        },
      ]);
    });
  });
});
