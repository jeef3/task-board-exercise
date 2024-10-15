import { Board, Ticket } from "../__generated__/graphql";

export interface BoardViewModel {
  id?: Board["id"];
  name: Board["name"];
}

export interface TicketViewModel {
  id?: Ticket["id"];
  name?: Ticket["name"];
  description?: Ticket["description"];
  status?: Ticket["status"];
  visible?: Ticket["visible"];
}
