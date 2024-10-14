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
import Board from "./components/BoardStatusColumns";
import BoardModal from "./modals/AddEditBoardModal";
import TicketModal from "./modals/AddEditTicketModal";
import DeleteBoardModal from "./modals/DeleteBoardModal";

import type {
  Board as TBoard,
  Ticket as TTicket,
} from "./__generated__/graphql";
import { useCurrentOrg } from "./hooks/hooks";
import Menu from "./components/Menu";
import useCurrentBoard from "./hooks/useCurrentBoard";

interface TicketModalState {
  show: boolean;

  organisationId?: string | null;
  boardId?: string | null;
}

export default function App() {
  const [currentBoard, setCurrentBoard] = useCurrentBoard();
  const { data: { organisation } = {}, refetch } = useCurrentOrg();

  const [deleteTicket] = useMutation(DELETE_TICKET);

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
        board={currentBoard}
        onClose={closeBoardModal}
      />
    ),
    [currentBoard, organisation],
  );

  const [showDeleteBoardModal, closeDeleteBoardModal] = useModal(
    () => (
      <DeleteBoardModal
        organisationId={organisation?.id ?? ""}
        board={currentBoard}
        onClose={closeDeleteBoardModal}
      />
    ),
    [currentBoard, organisation],
  );

  const [showTicketModal, closeTicketModal] = useModal(
    () => (
      <TicketModal
        organisationId={organisation?.id ?? ""}
        boardId={currentBoard?.id ?? ""}
        ticket={activeTicket}
        onClose={closeTicketModal}
      />
    ),
    [currentBoard, organisation],
  );

  const handleShowAddEditBoardClick = useCallback(
    (board: TBoard) => {
      setCurrentBoard(board);
      showBoardModal();
    },
    [showBoardModal],
  );

  const handleShowDeleteBoardClick = useCallback(
    (board: TBoard) => {
      setCurrentBoard(board);
      showDeleteBoardModal();
    },
    [showDeleteBoardModal],
  );

  const handleShowAddEditTicketClick = useCallback(
    (board: TBoard, ticket: TTicket | null) => {
      setCurrentBoard(board);
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

    setCurrentBoard(firstBoard as TBoard);
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
          <Menu />
          <Board />
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
