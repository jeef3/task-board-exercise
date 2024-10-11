import { useQuery, useMutation } from "@apollo/client";
import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useModal } from "react-modal-hook";

import { Board, Ticket } from "./__generated__/graphql";
import { DELETE_TICKET, GET_ME, GET_ORGANISATION } from "./queries";
import Overlay from "./components/Overlay";
import ModalHeader from "./components/ModalHeader";
import DeleteTicketForm from "./components/DeleteTicketForm";
import DeleteBoardForm from "./components/DeleteBoardForm";
import BoardModal from "./modals/AddEditBoardModal";
import TicketModal from "./modals/AddEditTicketModal";

interface BoardModalState {
  show: boolean;

  organisationId?: string | null;
}

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

  // const [deleteBoard] = useMutation(DELETE_BOARD);
  const [deleteTicket] = useMutation(DELETE_TICKET);

  const [activeBoard, setActiveBoard] = useState<Board | null>(null);
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);

  const [showDeleteBoard, setShowDeleteBoard] = useState<
    BoardModalState & { board?: Board | null }
  >({
    show: false,
    organisationId: null,
    board: null,
  });

  const [showDeleteTicket, setShowDeleteTicket] = useState<
    TicketModalState & { ticket?: Ticket | null }
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
    (board: Board) => {
      setActiveBoard(board);
      showBoardModal();
    },
    [showBoardModal],
  );

  const handleShowDeleteBoardClick = useCallback(
    (organisationId: string, board: Board) =>
      setShowDeleteBoard({ show: true, organisationId, board }),
    [],
  );

  const handleShowAddEditTicketClick = useCallback(
    (board: Board, ticket: Ticket | null) => {
      setActiveBoard(board);
      setActiveTicket(ticket);
      showTicketModal();
    },
    [showTicketModal],
  );

  const handleShowDeleteTicketClick = useCallback(
    (organisationId: string, boardId: string, ticket: Ticket) =>
      setShowDeleteTicket({ show: true, organisationId, boardId, ticket }),
    [],
  );

  const handleDeleteTicket = useCallback(
    async (organisationId: string, _boardId: string, ticket: Ticket) => {
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
      <header
        style={{
          padding: 8,
          color: "hsl(0 0% 100%)",
          background: "hsl(0 0% 0%)",

          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {organisation.name}
        <span>
          {me.firstName} {me.lastName}
        </span>
      </header>

      <div style={{ padding: 8 }}>
        <h2>Boards</h2>
        <button onClick={() => showBoardModal()}>Add board</button>

        <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
          {organisation.boards.map((b) => (
            <article
              key={b.id}
              style={{
                border: "solid 1px hsl(0 0% 50%)",
                borderRadius: 8,

                display: "flex",
                gap: 4,
                flexDirection: "column",
              }}
            >
              <header
                style={{
                  padding: 4,
                  borderBottom: "solid 1px hsl(0 0% 95%)",
                  display: "flex",
                  gap: 4,
                }}
              >
                <h3>{b.name}</h3>

                <button
                  onClick={() => handleShowAddEditTicketClick(b as Board, null)}
                >
                  Add ticket
                </button>

                <button onClick={() => handleShowAddEditBoardClick(b as Board)}>
                  Edit board
                </button>

                <button
                  disabled
                  onClick={() =>
                    handleShowDeleteBoardClick(organisation.id, b as Board)
                  }
                >
                  Delete board
                </button>
              </header>

              <div style={{ padding: 4 }}>
                {!b.tickets.length ? (
                  <div>This board as no tickets, yet! </div>
                ) : (
                  <ul>
                    {b.tickets.map((t) => (
                      <li
                        key={t.id}
                        style={{
                          display: "flex",
                          gap: 4,
                          alignItems: "center",
                        }}
                      >
                        <span>
                          {t.status === "DONE"
                            ? "✅"
                            : t.status === "INPROGRESS"
                              ? "🔵"
                              : "⚪"}
                        </span>{" "}
                        <span
                          style={{
                            color: t.visible ? "hsl(0 0% 0%)" : "hsl(0 0% 70%)",
                            textDecoration:
                              t.status === "DONE" ? "line-through" : "none",
                          }}
                        >
                          {t.name}
                        </span>{" "}
                        <button
                          onClick={() =>
                            handleShowAddEditTicketClick(
                              b as Board,
                              t as Ticket,
                            )
                          }
                        >
                          Edit ticket
                        </button>
                        <button
                          onClick={() =>
                            handleShowDeleteTicketClick(
                              organisation.id,
                              b.id,
                              t as Ticket,
                            )
                          }
                        >
                          Delete ticket
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>

        <details
          style={{
            marginTop: 8,
            borderRadius: 8,
            background: "hsl(0 0% 95%)",
          }}
        >
          <summary style={{ padding: 8 }}>Raw Data</summary>
          <div style={{ overflow: "scroll", padding: 8, maxHeight: 300 }}>
            <pre>{JSON.stringify(dataMe, null, 2)}</pre>
            <pre>{JSON.stringify(dataOrg, null, 2)}</pre>
          </div>
        </details>
      </div>

      {showDeleteBoard.show &&
        showDeleteBoard.organisationId &&
        showDeleteBoard.board &&
        createPortal(
          <>
            <Overlay />
            <dialog
              open
              style={{ position: "fixed", top: 50, maxWidth: "90%" }}
            >
              <ModalHeader
                title="Delete Board"
                onClose={() => setShowDeleteBoard({ show: false, board: null })}
              />

              <DeleteBoardForm
                organisationId={showDeleteBoard.organisationId}
                board={showDeleteBoard.board}
                onClose={() => setShowDeleteBoard({ show: false, board: null })}
              />
            </dialog>
          </>,
          document.getElementById("modal")!,
        )}

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
