import { type FormEvent, useCallback } from "react";

import { type Ticket } from "../__generated__/graphql";
import useForm from "../useForm";

export default function TicketForm({
  ticket = null,
  onSubmit,
  onClose,
}: {
  ticket?: Ticket | null;
  onSubmit?: (ticket: Ticket) => void;
  onClose?: () => void;
}) {
  const { data, handleChange } = useForm<Ticket>(ticket);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      // TODO: Validation checks on data

      onSubmit?.(data);
      onClose?.();
    },
    [data, onClose, onSubmit],
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
          defaultValue={ticket?.name}
          onChange={handleChange}
        />
      </label>

      <label>
        Description{" "}
        <input
          required
          type="text"
          name="description"
          defaultValue={ticket?.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Status
        <select
          required
          name="status"
          defaultValue={ticket?.status}
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
          defaultChecked={!!ticket?.visible}
          onChange={handleChange}
        />
      </label>

      <button>Save</button>
    </form>
  );
}
