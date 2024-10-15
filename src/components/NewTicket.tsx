import { FormEvent, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IconCheck, IconGripVertical, IconLoader2 } from "@tabler/icons-react";

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
import { useCurrentOrg, useUpdateTicket } from "../hooks/hooks";
import useCurrentBoard from "../hooks/useCurrentBoard";
import usePosition from "../hooks/usePosition";

export default function NewTicket({
  template,
  onClose,
}: {
  template: Partial<TTicket>;
  onClose?: () => void;
}) {
  const { data: { organisation } = {}, refetch } = useCurrentOrg();
  const [currentBoard] = useCurrentBoard();

  const [updateTicket] = useUpdateTicket();

  const nameEl = useRef<HTMLInputElement>(null);

  const { targetRef, positionProps } = usePosition<HTMLDivElement>();

  const { formData, formState, handleChange, handleSubmit, setError } =
    useForm<TicketViewModel>({
      name: template.name,
      description: template.description,
      status: template.status,
      visible: template.visible,
    });

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

          await refetch();
          onClose?.();
        } catch {
          setError("__root__", "Something went wrong, please try again");
        }
      })(e),
    [
      currentBoard,
      handleSubmit,
      onClose,
      organisation,
      refetch,
      setError,
      updateTicket,
    ],
  );

  useEffect(() => nameEl.current?.focus(), []);

  return (
    <>
      <TicketContainer ref={targetRef} />

      {createPortal(
        <>
          <Overlay onClick={() => !formState.isSubmitting && onClose?.()} />
          <TicketContainer as="form" onSubmit={onSubmit} {...positionProps}>
            <Grip>
              <IconGripVertical size="1em" />
            </Grip>

            <TicketContent $editing>
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

            <ButtonBar
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button
                $type="action"
                type="submit"
                disabled={formState.isSubmitting}
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
