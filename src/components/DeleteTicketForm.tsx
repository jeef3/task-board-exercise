import { type FormEvent, useCallback } from "react";

import { type Ticket } from "../__generated__/graphql";
import useForm from "../useForm";

export default function TicketForm({
  organisationId,
  boardId,
  ticket = null,
  onSubmit,
  onClose,
}: {
  organisationId: string;
  boardId: string;
  ticket?: Ticket | null;
  onSubmit?: (organisationId: string, boardId: string, ticket: Ticket) => void;
  onClose?: () => void;
}) {
  const { data, handleChange } = useForm<Ticket>(
    ticket ?? ({ name: "", status: "TODO", visible: true } as Ticket),
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      // TODO: Validation checks on data

      onSubmit?.(organisationId, boardId, data);
      onClose?.();
    },
    [boardId, data, onClose, onSubmit, organisationId],
  );

  return (
    <div>
      <button onClick={onClose}>Close</button>
      <button onClick={handleSubmit}>Yes, delete</button>
    </div>
  );
}
