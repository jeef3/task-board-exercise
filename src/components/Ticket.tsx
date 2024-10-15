import { FormEvent, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  IconCheck,
  IconGripVertical,
  IconLoader2,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";

import type { Ticket as TTicket } from "../__generated__/graphql";
import useForm from "../hooks/useForm";
import { TicketViewModel } from "../hooks/viewModels";
import { ButtonBar, Spin } from "./atoms/Layout";
import { InlineInput, InlineTextArea } from "./atoms/Form";
import {
  TicketContainer,
  Description,
  Grip,
  Name,
  TicketContent,
} from "./atoms/TicketAtoms";
import Button from "./Button";
import Overlay from "./atoms/Overlay";
import {
  useCurrentOrg,
  useDeleteTicket,
  useUpdateTicket,
} from "../hooks/hooks";
import useCurrentBoard from "../hooks/useCurrentBoard";
import usePosition from "../hooks/usePosition";

export default function Ticket({ ticket }: { ticket: TTicket }) {
  const { data: { organisation } = {}, refetch } = useCurrentOrg();
  const [currentBoard] = useCurrentBoard();

  const [updateTicket] = useUpdateTicket();
  const [deleteTicket] = useDeleteTicket();

  const nameEl = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { targetRef, positionProps } = usePosition<HTMLDivElement>();

  const { formData, formState, handleChange, handleSubmit, setError } =
    useForm<TicketViewModel>({
      id: ticket.id,
      name: ticket.name,
      description: ticket.description,
      status: ticket.status,
      visible: ticket.visible,
    });

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
    setTimeout(() => nameEl.current?.select());
  }, []);

  const handleDeleteClick = useCallback(async () => {
    if (!organisation) return;
    setIsDeleting(true);

    await deleteTicket({
      variables: { organisationId: organisation.id, ticketId: ticket.id },
    });
    await refetch();
  }, [deleteTicket, organisation, refetch, ticket.id]);

  const onSubmit = useCallback(
    (e: FormEvent) =>
      void handleSubmit(async (ticket: TicketViewModel) => {
        if (!organisation || !currentBoard) return;

        try {
          await updateTicket({
            variables: {
              organisationId: organisation.id,
              boardId: currentBoard.id,

              ticketId: ticket.id,
              input: {
                name: ticket.name,
                description: ticket.description,
                status: ticket.status,
                visible: ticket.visible,
              },
            },
          });

          setIsEditing(false);
        } catch {
          setError("__root__", "Something went wrong, please try again");
        }
      })(e),
    [currentBoard, handleSubmit, organisation, setError, updateTicket],
  );

  return (
    <>
      <TicketContainer
        ref={targetRef}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        <Grip>
          <IconGripVertical size="1em" />
        </Grip>
        <TicketContent>
          <Name>{ticket.name}</Name>
          <Description>
            {ticket.description || <em>No description</em>}
          </Description>
        </TicketContent>

        <ButtonBar
          style={{ position: "absolute", zIndex: 1, top: 2, right: 2 }}
        >
          <Button
            title="Rename board"
            style={{ opacity: isHovering ? 1 : 0 }}
            onClick={handleEditClick}
          >
            <IconPencil size="1em" />
          </Button>
        </ButtonBar>
      </TicketContainer>

      {isEditing &&
        createPortal(
          <>
            <Overlay
              onClick={() => !formState.isSubmitting && setIsEditing(false)}
            />
            <TicketContainer as="form" onSubmit={onSubmit} {...positionProps()}>
              <Grip>
                <IconGripVertical size="1em" />
              </Grip>

              <TicketContent $editing={isEditing}>
                <Name>
                  <InlineInput
                    ref={nameEl}
                    required
                    name="name"
                    disabled={formState.isSubmitting || isDeleting}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Name>
                <Description>
                  <InlineTextArea
                    name="description"
                    disabled={formState.isSubmitting || isDeleting}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Description>
              </TicketContent>

              <ButtonBar
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  $type="destructive"
                  type="button"
                  disabled={formState.isSubmitting || isDeleting}
                  onClick={handleDeleteClick}
                >
                  {isDeleting ? (
                    <>
                      <Spin>
                        <IconLoader2 size="1em" />
                      </Spin>{" "}
                      Deleting ticket…
                    </>
                  ) : (
                    <>
                      <IconTrash size="1em" /> Delete ticket
                    </>
                  )}
                </Button>
                <Button
                  $type="action"
                  type="submit"
                  disabled={formState.isSubmitting || isDeleting}
                >
                  {formState.isSubmitting ? (
                    <>
                      <Spin>
                        <IconLoader2 size="1em" />
                      </Spin>{" "}
                      Saving changes…
                    </>
                  ) : (
                    <>
                      <IconCheck size="1em" /> Save changes
                    </>
                  )}
                </Button>
              </ButtonBar>
            </TicketContainer>
          </>,
          document.getElementById("modal")!,
        )}
    </>
  );
}
