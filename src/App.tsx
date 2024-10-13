import { useMutation } from "@apollo/client";
import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { useModal } from "react-modal-hook";

import { DELETE_TICKET } from "./queries";
import { AppBody, AppContainer } from "./components/atoms/AppAtoms";
import AppHeader from "./components/AppHeader";
import Overlay from "./components/Overlay";
import ModalHeader from "./components/ModalHeader";
import DeleteTicketForm from "./components/DeleteTicketForm";
import BoardStatusColumns from "./components/BoardStatusColumns";
import BoardModal from "./modals/AddEditBoardModal";
import TicketModal from "./modals/AddEditTicketModal";
import DeleteBoardModal from "./modals/DeleteBoardModal";

import type {
  Board as TBoard,
  Ticket as TTicket,
} from "./__generated__/graphql";
import { useCurrentOrg } from "./hooks/hooks";
import Button from "./components/Button";
import {
  IconDotsVertical,
  IconGripVertical,
  IconPlus,
  IconSquarePlus2,
} from "@tabler/icons-react";

interface TicketModalState {
  show: boolean;

  organisationId?: string | null;
  boardId?: string | null;
}

export default function App() {
  const { data: { organisation } = {}, refetch } = useCurrentOrg();

  // const { data: dataSub, loading: loadingSub } = useSubscription(
  //   SUBSCRIPTION_TICKETS,
  //   {
  //     skip: !organisationId,
  //     variables: { organisationId: organisationId ?? "" },
  //   },
  // );

  const [deleteTicket] = useMutation(DELETE_TICKET);

  const [activeBoard, setActiveBoard] = useState<TBoard | null>(null);
  const [activeTicket, setActiveTicket] = useState<TTicket | null>(null);

  const [showDeleteTicket, setShowDeleteTicket] = useState<
    TicketModalState & { ticket?: TTicket | null }
  >({
    show: false,
    organisationId: null,
    boardId: null,
    ticket: null,
  });

  const [showBoardModal, closeBoardModal] = useModal(
    () => (
      <BoardModal
        organisationId={organisation?.id ?? ""}
        board={activeBoard}
        onClose={closeBoardModal}
      />
    ),
    [activeBoard, organisation],
  );

  const [showDeleteBoardModal, closeDeleteBoardModal] = useModal(
    () => (
      <DeleteBoardModal
        organisationId={organisation?.id ?? ""}
        board={activeBoard}
        onClose={closeDeleteBoardModal}
      />
    ),
    [activeBoard, organisation],
  );

  const [showTicketModal, closeTicketModal] = useModal(
    () => (
      <TicketModal
        organisationId={organisation?.id ?? ""}
        boardId={activeBoard?.id ?? ""}
        ticket={activeTicket}
        onClose={closeTicketModal}
      />
    ),
    [activeBoard, organisation],
  );

  const handleShowAddEditBoardClick = useCallback(
    (board: TBoard) => {
      setActiveBoard(board);
      showBoardModal();
    },
    [showBoardModal],
  );

  const handleShowDeleteBoardClick = useCallback(
    (board: TBoard) => {
      setActiveBoard(board);
      showDeleteBoardModal();
    },
    [showDeleteBoardModal],
  );

  const handleShowAddEditTicketClick = useCallback(
    (board: TBoard, ticket: TTicket | null) => {
      setActiveBoard(board);
      setActiveTicket(ticket);
      showTicketModal();
    },
    [showTicketModal],
  );

  const handleShowDeleteTicketClick = useCallback(
    (organisationId: string, boardId: string, ticket: TTicket) =>
      setShowDeleteTicket({ show: true, organisationId, boardId, ticket }),
    [],
  );

  const handleDeleteTicket = useCallback(
    async (organisationId: string, _boardId: string, ticket: TTicket) => {
      await deleteTicket({
        variables: { organisationId, ticketId: ticket.id },
      });
      refetch();
    },
    [deleteTicket, refetch],
  );

  useEffect(() => {
    if (!organisation) return;

    const firstBoard = organisation.boards[0];

    if (!firstBoard) return;

    setActiveBoard(firstBoard as TBoard);
  }, [organisation]);

  // if (loadingMe || loadingOrg) return <p>Loading…</p>;
  // if (errorMe || errorOrg)
  //   return (
  //     <p>
  //       Error:{" "}
  //       {errorMe
  //         ? errorMe.message
  //         : errorOrg
  //           ? errorOrg.message
  //           : "Unknown error"}
  //     </p>
  //   );
  // if (!me) return <p>No me data</p>;
  // if (!organisation) return <p>No org data</p>;

  return (
    <>
      <AppContainer>
        <AppHeader />

        <AppBody>
          <div
            style={{
              padding: 8,
              display: "flex",
              gap: 4,
              alignItems: "center",
              background: "hsl(240 45% 80%)",
            }}
          >
            {organisation?.boards.map((b) => (
              <Button
                onClick={() => setActiveBoard(b as TBoard)}
                $active={b === activeBoard}
              >
                {b.name}
              </Button>
            ))}

            <IconDotsVertical size="1em" color="hsl(0 0% 0% / 20%)" />

            <Button onClick={() => showBoardModal()}>
              <IconSquarePlus2 size="1em" /> Add board
            </Button>
          </div>
          <BoardStatusColumns board={activeBoard} />
        </AppBody>
      </AppContainer>

      {showDeleteTicket.show &&
        showDeleteTicket.organisationId &&
        showDeleteTicket.boardId &&
        showDeleteTicket.ticket &&
        createPortal(
          <>
            <Overlay />
            <dialog
              open
              style={{ position: "fixed", top: 50, maxWidth: "90%" }}
            >
              <ModalHeader
                title="Delete Ticket"
                onClose={() => setShowDeleteTicket({ show: false })}
              />

              <DeleteTicketForm
                organisationId={showDeleteTicket.organisationId}
                boardId={showDeleteTicket.boardId}
                ticket={showDeleteTicket.ticket}
                onSubmit={handleDeleteTicket}
                onClose={() => setShowDeleteTicket({ show: false })}
              />
            </dialog>
          </>,
          document.getElementById("modal")!,
        )}
    </>
  );
}
