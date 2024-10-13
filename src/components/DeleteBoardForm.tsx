import { type FormEvent, useCallback } from "react";

import { type Board } from "../__generated__/graphql";
import useForm from "../hooks/useForm";

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
}) {}
