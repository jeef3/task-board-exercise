import { FormEvent, useCallback } from "react";
import { useMutation } from "@apollo/client";

import { Board } from "../__generated__/graphql";
import Modal from "../components/Modal";
import ModalHeader from "../components/ModalHeader";
import useForm from "../hooks/useForm";
import { PUT_BOARD } from "../queries";

interface BoardViewModel {
  id?: Board["id"];
  name: Board["name"];
}

const defaultNewBoard: BoardViewModel = {
  name: "",
};

export default function AddEditBoardModal({
  organisationId,
  board = null,
  onClose,
}: {
  organisationId: string;
  board?: Board | null;
  onClose: () => void;
}) {
  const [addOrEditBoard] = useMutation(PUT_BOARD);

  const { formData, formState, handleChange, handleSubmit, setError } =
    useForm<BoardViewModel>(board ?? defaultNewBoard);

  const onSubmit = useCallback(
    (e: FormEvent) =>
      void handleSubmit(async (board: BoardViewModel) => {
        try {
          await addOrEditBoard({
            variables: {
              organisationId,

              boardId: board.id,
              input: {
                name: board.name,
              },
            },
          });

          onClose?.();
        } catch {
          setError("__root__", "Something went wrong, please try again");
        }
      })(e),
    [addOrEditBoard, handleSubmit, onClose, organisationId, setError],
  );

  return (
    <Modal>
      <ModalHeader title="Add Board" onClose={onClose} />

      <form
        onSubmit={onSubmit}
        style={{ display: "flex", gap: 8, flexDirection: "column" }}
      >
        <label>
          Name
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <button disabled={formState.isSubmitting}>
          {formState.isSubmitting ? "Saving…" : "Save"}
        </button>
      </form>
    </Modal>
  );
}
