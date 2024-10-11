import { type FormEvent, useCallback } from "react";
import { useMutation } from "@apollo/client";

import { TicketStatus, type Ticket } from "../__generated__/graphql";
import { PUT_TICKET } from "../queries";
import useForm from "../useForm";

interface TicketViewModel {
  id?: Ticket["id"];
  name: Ticket["name"];
  description: Ticket["description"];
  status: Ticket["status"];
  visible: Ticket["visible"];
}

const defaultNewTicket: TicketViewModel = {
  name: "",
  description: "",
  status: TicketStatus.Todo,
  visible: true,
};

export default function TicketForm({
  organisationId,
  boardId,
  ticket = null,
  onClose,
}: {
  organisationId: string;
  boardId: string;
  ticket?: Ticket | null;
  onClose?: () => void;
}) {
  const [addOrEditTicket] = useMutation(PUT_TICKET);

  const { formData, formState, handleChange, handleSubmit, setError } =
    useForm<TicketViewModel>(ticket ?? defaultNewTicket);

  const onSubmit = useCallback(
    (e: FormEvent) =>
      void handleSubmit(async (ticket: TicketViewModel) => {
        // try {
        //   await new Promise<void>((_resolve, reject) => {
        //     setTimeout(() => {
        //       // resolve();
        //       reject();
        //     }, 2000);
        //   });
        // } catch (e) {
        //   console.log("error", e);
        //   setError("__root__", "name");
        // }

        const { id, ...input } = ticket;

        try {
          await addOrEditTicket({
            variables: {
              organisationId,
              boardId,

              ticketId: id,
              input,
            },
          });

          onClose?.();
        } catch {
          setError("__root__", "Something went wrong, please try again");
        }
      })(e),
    [addOrEditTicket, boardId, handleSubmit, onClose, organisationId, setError],
  );

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", gap: 8, flexDirection: "column" }}
    >
      {formState.errors.length > 0 && <div>There was an error</div>}

      <label>
        Name{" "}
        <input
          required
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>

      <label>
        Description
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Status
        <select
          required
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="TODO">To Do</option>
          <option value="INPROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
      </label>

      <label>
        Visible
        <input
          type="checkbox"
          name="visible"
          checked={!!formData.visible}
          onChange={handleChange}
        />
      </label>

      <button disabled={formState.isSubmitting}>
        {formState.isSubmitting ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
