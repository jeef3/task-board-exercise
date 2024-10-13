import { FormEvent, useCallback } from "react";
import { Board } from "../__generated__/graphql";
import Modal from "../components/Modal";
import ModalHeader from "../components/ModalHeader";
import useForm from "../hooks/useForm";

export default function DeleteBoardModal({
  organisationId,
  board,
  onClose,
}: {
  organisationId: string;
  board: Board;
  onClose: () => void;
}) {
  const { formData: data } = useForm<Board>(board);

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
    <Modal>
      <ModalHeader title="Delete Board" onClose={onClose} />

      <div>
        <p>Are you sure you want to delete this board?</p>

        <button onClick={onClose}>Close</button>
        <button onClick={handleSubmit}>Yes, delete board</button>
      </div>
    </Modal>
  );
}
