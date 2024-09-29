import { type FormEvent, useCallback } from "react";

import { type Board } from "../__generated__/graphql";
import useForm from "../useForm";

export default function BoardForm({
  organisationId,
  board = null,
  onSubmit,
  onClose,
}: {
  organisationId: string;
  board?: Board | null;
  onSubmit?: (organisationId: string, board: Board) => void;
  onClose?: () => void;
}) {
  const { data, handleChange } = useForm<Board>(board);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      // TODO: Validation checks on data

      onSubmit?.(organisationId, data);
      onClose?.();
    },
    [data, onClose, onSubmit, organisationId],
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

      <button>Save</button>
    </form>
  );
}