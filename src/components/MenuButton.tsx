import {
  FormEvent,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { IconCheck, IconPencil } from "@tabler/icons-react";
import styled from "styled-components";

import Button from "./Button";
import { isString } from "../util/typeGuards";
import { useCurrentOrg, useUpdateBoard } from "../hooks/hooks";
import useForm from "../hooks/useForm";
import { BoardViewModel } from "../hooks/viewModels";

const Container = styled(Button)`
  padding: 2px;

  border-radius: 8px;

  display: grid;
  grid-template-columns: 1fr auto;
`;

export default function MenuButton({
  label,
  active = false,
  onClick,
}: {
  label: ReactNode;
  active?: boolean;
  onClick?: MouseEventHandler;
}) {
  const { data: { organisation } = {} } = useCurrentOrg();
  const [updateBoard] = useUpdateBoard();

  const el = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [hover, setHover] = useState(false);

  const { formData, formState, handleChange, handleSubmit, setError } =
    useForm<BoardViewModel>();

  const handleEditClick: MouseEventHandler = useCallback((e) => {
    setEditing(true);
    setTimeout(() => {
      el.current?.select();
    });
  }, []);

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
        } catch {
          setError("__root__", "Something went wrong, please try again");
        }
      })(e),
    [handleSubmit, organisation, setError, updateBoard],
  );

  return (
    <form onSubmit={onSubmit}>
      <Container
        as="div"
        $active={active || editing}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        {editing && isString(label) ? (
          <>
            <input
              ref={el}
              required
              name="name"
              value={label}
              onChange={handleChange}
              style={{
                display: "block",
                width: "auto",
                border: 0,
                background: "transparent",
                borderRadius: 6,
                padding: 4,
                color: "black",
              }}
            />

            <div style={{ width: 50, display: "flex" }}>
              <Button
                $type="action"
                title="Save changes"
                onClick={() => setEditing(false)}
              >
                <IconCheck size="1em" />
              </Button>
              <Button
                $type="action"
                title="Save changes"
                onClick={() => setEditing(false)}
              >
                <IconCheck size="1em" />
              </Button>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                padding: 4,
                fontWeight: active ? 600 : 400,
                color: active ? "black" : "inherit",
              }}
              onClick={onClick}
            >
              {label}
            </div>

            <Button
              title="Rename board"
              style={{ opacity: hover ? 1 : 0 }}
              onClick={handleEditClick}
            >
              <IconPencil size="1em" />
            </Button>
          </>
        )}
      </Container>
    </form>
  );
}
