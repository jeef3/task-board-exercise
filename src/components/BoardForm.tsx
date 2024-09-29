import { type FormEvent, useCallback } from "react";

import { type Board } from "../__generated__/graphql";
import useForm from "../useForm";

export default function BoardForm({
  board = null,
  onSubmit,
  onClose,
}: {
  board?: Board | null;
  onSubmit?: (board: Board) => void;
  onClose?: () => void;
}) {
  const { data, handleChange } = useForm<Board>(board);

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
    <form onSubmit={handleSubmit}>
      <label>
        Name <input required type="text" name="name" onChange={handleChange} />
      </label>

      <button>Save</button>
    </form>
  );
}
