import {
  FormEvent,
  MouseEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  IconCheck,
  IconLoader2,
  IconPencil,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import styled from "styled-components";

import { Board } from "../__generated__/graphql";
import Button from "./Button";
import { useCurrentOrg, useUpdateBoard } from "../hooks/hooks";
import useForm from "../hooks/useForm";
import { BoardViewModel } from "../hooks/viewModels";
import { ButtonBar, Spin } from "./atoms/Layout";
import useCurrentBoard from "../hooks/useCurrentBoard";
import { createPortal } from "react-dom";
import Overlay from "./atoms/Overlay";

const Container = styled(Button)<{ $editing?: boolean }>`
  position: ${({ $editing }) => ($editing ? "relative" : "unset")};
  z-index: ${({ $editing }) => ($editing ? "1" : "0")};
  padding: 2px;

  background: hsl(240 45% 80%) !important;
  border-radius: 8px;

  display: grid;
  grid-template-columns: 1fr auto;
`;

export default function BoardButton({ board }: { board: Board }) {
  const [currentBoard, setCurrentBoard] = useCurrentBoard();
  const { data: { organisation } = {} } = useCurrentOrg();
  const [updateBoard] = useUpdateBoard();

  const el = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const isCurrentBoard = useMemo(
    () => currentBoard && board.id === currentBoard.id,
    [board.id, currentBoard],
  );

  const { formData, formState, handleChange, handleSubmit, setError } =
    useForm<BoardViewModel>({ id: board.id, name: board.name });

  const handleEditClick: MouseEventHandler = useCallback(() => {
    setIsEditing(true);
    setTimeout(() => {
      el.current?.select();
    });
  }, []);

  const handleDeleteClick: MouseEventHandler = useCallback(() => {}, []);

  const onSubmit = useCallback(
    (e: FormEvent) =>
      void handleSubmit(async (board: BoardViewModel) => {
        if (!organisation) return;

        try {
          await updateBoard({
            variables: {
              organisationId: organisation.id,

              boardId: board.id,
              input: {
                name: board.name,
              },
            },
          });

          setIsEditing(false);
        } catch {
          setError("__root__", "Something went wrong, please try again");
        }
      })(e),
    [handleSubmit, organisation, setError, updateBoard],
  );

  return (
    <>
      <Container
        as="form"
        $active={isCurrentBoard || isEditing}
        $editing={isEditing}
        onSubmit={onSubmit}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        {isEditing ? (
          <>
            <input
              ref={el}
              required
              name="name"
              disabled={formState.isSubmitting}
              value={formData.name}
              onChange={handleChange}
              style={{
                display: "block",
                minWidth: 1,
                width: "auto",
                border: 0,
                background: "transparent",
                borderRadius: 6,
                padding: 4,
                color: "black",
              }}
            />

            <ButtonBar>
              <Button
                $type="action"
                type="submit"
                title="Save changes"
                disabled={formState.isSubmitting}
              >
                {formState.isSubmitting ? (
                  <Spin>
                    <IconLoader2 size="1em" />
                  </Spin>
                ) : (
                  <IconCheck size="1em" />
                )}
              </Button>
              <Button
                $type="destructive"
                title="Discard changes"
                disabled={formState.isSubmitting}
                onClick={() => setIsEditing(false)}
              >
                <IconX size="1em" />
              </Button>
            </ButtonBar>

            <Button
              $type="destructive"
              onClick={handleDeleteClick}
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
              }}
            >
              <IconTrash size="1em" /> Delete board
            </Button>
          </>
        ) : (
          <>
            <div
              style={{
                padding: 4,
                fontWeight: isCurrentBoard ? 600 : 400,
                color: isCurrentBoard ? "black" : "inherit",
              }}
              onClick={() => setCurrentBoard(board)}
            >
              {board.name}
            </div>

            <ButtonBar>
              <Button
                title="Rename board"
                style={{ opacity: isHovering ? 1 : 0 }}
                onClick={handleEditClick}
              >
                <IconPencil size="1em" />
              </Button>
            </ButtonBar>
          </>
        )}
      </Container>

      {isEditing &&
        createPortal(
          <Overlay onClick={() => setIsEditing(false)} />,
          document.getElementById("modal")!,
        )}
    </>
  );
}
