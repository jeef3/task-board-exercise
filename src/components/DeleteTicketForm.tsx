import { type FormEvent, useCallback } from "react";

import { type Ticket } from "../__generated__/graphql";
import useForm from "../useForm";

export default function DeleteTicketForm({
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
  const { formData: data } = useForm<Ticket>(
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
      <p>Are you sure you want to delete this ticket?</p>

      <button onClick={onClose}>Close</button>
      <button onClick={handleSubmit}>Yes, delete</button>
    </div>
  );
}
