import { FormEvent, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IconGripVertical, IconPencil, IconTrash } from "@tabler/icons-react";

import type { Ticket as TTicket } from "../__generated__/graphql";
import useForm from "../hooks/useForm";
import { TicketViewModel } from "../hooks/viewModels";
import { ButtonBar } from "./atoms/Layout";
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
import { useCurrentOrg, useUpdateTicket } from "../hooks/hooks";
import useCurrentBoard from "../hooks/useCurrentBoard";

export default function Ticket({ ticket }: { ticket: TTicket }) {
  const { data: { organisation } = {} } = useCurrentOrg();
  const [currentBoard] = useCurrentBoard();
  const [updateTicket] = useUpdateTicket();

  const nameEl = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

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

  const handleDeleteClick = useCallback(() => {}, []);

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
        } catch {
          setError("__root__", "Something went wrong, please try again");
        }
      })(e),
    [currentBoard, handleSubmit, organisation, setError, updateTicket],
  );

  return (
    <>
      <TicketContainer
        $editing={isEditing}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      >
        <Grip>
          <IconGripVertical size="1em" />
        </Grip>
        {isEditing ? (
          <>
            <TicketContent as="form" $editing={isEditing} onSubmit={onSubmit}>
              <Name>
                <InlineInput
                  ref={nameEl}
                  required
                  name="name"
                  disabled={formState.isSubmitting}
                  value={formData.name}
                  onChange={handleChange}
                />
              </Name>
              <Description>
                <InlineTextArea
                  name="description"
                  disabled={formState.isSubmitting}
                  value={formData.description}
                  onChange={handleChange}
                />
              </Description>
            </TicketContent>

            <Button
              $type="destructive"
              onClick={handleDeleteClick}
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
              }}
            >
              <IconTrash size="1em" /> Delete ticket
            </Button>
          </>
        ) : (
          <>
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
          </>
        )}
      </TicketContainer>

      {isEditing &&
        createPortal(
          <Overlay onClick={() => setIsEditing(false)} />,
          document.getElementById("modal")!,
        )}
    </>
  );
}
