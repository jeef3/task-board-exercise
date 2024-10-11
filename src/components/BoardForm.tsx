import { type FormEvent, useCallback } from "react";

import { type Board } from "../__generated__/graphql";
import useForm from "../useForm";
import { useMutation } from "@apollo/client";
import { PUT_BOARD } from "../queries";

interface BoardViewModel {
  id?: Board["id"];
  name: Board["name"];
}

const defaultNewBoard: BoardViewModel = {
  name: "",
};

export default function BoardForm({
  organisationId,
  board = null,
  onClose,
}: {
  organisationId: string;
  board?: Board | null;
  onClose?: () => void;
}) {
  const [addOrEditBoard] = useMutation(PUT_BOARD);

  const { formData, formState, handleChange, handleSubmit, setError } =
    useForm<BoardViewModel>(board ?? defaultNewBoard);

  const onSubmit = useCallback(
    (e: FormEvent) =>
      void handleSubmit(async (board: BoardViewModel) => {
        const { id, ...input } = board;

        try {
          await addOrEditBoard({
            variables: {
              organisationId,

              boardId: id,
              input,
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
  );
}
