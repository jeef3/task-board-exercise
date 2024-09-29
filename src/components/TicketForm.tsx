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
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: 8, flexDirection: "column" }}
    >
      <label>
        Name{" "}
        <input
          required
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
      </label>

      <label>
        Description{" "}
        <input
          type="text"
          name="description"
          value={data.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Status
        <select
          required
          name="status"
          value={data.status}
          onChange={handleChange}
        >
          <option value="TODO">To Do</option>
          <option value="INPROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
      </label>

      <label>
        Visible
        <input
          type="checkbox"
          name="visible"
          checked={!!data.visible}
          onChange={handleChange}
        />
      </label>

      <button>Save</button>
    </form>
  );
}
