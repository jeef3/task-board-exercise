import { type FormEvent, useCallback } from "react";

import { type Board } from "../__generated__/graphql";
import useForm from "../useForm";

export default function DeleteBoardForm({
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
  const { data } = useForm<Board>(board);

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
    <div>
      <p>Are you sure you want to delete this board?</p>

      <button onClick={onClose}>Close</button>
      <button onClick={handleSubmit}>Yes, delete board</button>
    </div>
  );
}
