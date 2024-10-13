import { useQuery, useMutation } from "@apollo/client";
import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useModal } from "react-modal-hook";

import { DELETE_TICKET, GET_ME, GET_ORGANISATION } from "./queries";
import Overlay from "./components/Overlay";
import ModalHeader from "./components/ModalHeader";
import DeleteTicketForm from "./components/DeleteTicketForm";
import BoardLists from "./components/BoardLists";
import BoardModal from "./modals/AddEditBoardModal";
import TicketModal from "./modals/AddEditTicketModal";
import DeleteBoardModal from "./modals/DeleteBoardModal";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;

  background: blue;

  display: grid;
  grid-template-rows: [header] auto [main] 1fr;
`;

import type {
  Board as TBoard,
  Ticket as TTicket,
} from "./__generated__/graphql";
import styled from "styled-components";

interface TicketModalState {
  show: boolean;

  organisationId?: string | null;
  boardId?: string | null;
}

export default function App() {
  const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(GET_ME);

  const { me } = dataMe ?? {};
  const organisationId = me?.memberships[0]?.organisation.id;

  const {
    loading: loadingOrg,
    error: errorOrg,
    data: dataOrg,
    refetch,
  } = useQuery(GET_ORGANISATION, {
    skip: !organisationId,
    variables: { organisationId: organisationId ?? "" },
  });

  const { organisation } = dataOrg ?? {};

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
        organisationId={organisationId ?? ""}
        board={activeBoard}
        onClose={closeBoardModal}
      />
    ),
    [activeBoard, organisationId],
  );

  const [showDeleteBoardModal, closeDeleteBoardModal] = useModal(
    () => (
      <DeleteBoardModal
        organisationId={organisationId ?? ""}
        board={activeBoard}
        onClose={closeDeleteBoardModal}
      />
    ),
    [activeBoard, organisationId],
  );

  const [showTicketModal, closeTicketModal] = useModal(
    () => (
      <TicketModal
        organisationId={organisationId ?? ""}
        boardId={activeBoard?.id ?? ""}
        ticket={activeTicket}
        onClose={closeTicketModal}
      />
    ),
    [activeBoard, organisationId],
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

  if (loadingMe || loadingOrg) return <p>Loading…</p>;
  if (errorMe || errorOrg)
    return (
      <p>
        Error:{" "}
        {errorMe
          ? errorMe.message
          : errorOrg
            ? errorOrg.message
            : "Unknown error"}
      </p>
    );
  if (!me) return <p>No me data</p>;
  if (!organisation) return <p>No org data</p>;

  return (
    <>
      <AppContainer>
        <header
          style={{
            padding: 16,
            color: "hsl(0 0% 100%)",
            background: "hsl(0 0% 10%)",

            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {organisation.name}
          <span>
            {me.firstName} {me.lastName}
          </span>
        </header>
        <main
          style={{
            overflow: "hidden",
            display: "grid",
            gridTemplateRows: "[board-header] auto [lists] 1fr",
          }}
        >
          <div style={{ display: "flex" }}>
            <h2>Boards</h2>
            <button onClick={() => showBoardModal()}>Add board</button>
          </div>
          <BoardLists board={organisation.boards[0] as TBoard} />
        </main>
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
