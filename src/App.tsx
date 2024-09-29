import { useQuery, useMutation } from "@apollo/client";
import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import BoardForm from "./components/BoardForm";
import Overlay from "./components/Overlay";
import { GET_ME, GET_ORGANISATION, PUT_BOARD, PUT_TICKET } from "./queries";
import { Board, Ticket } from "./__generated__/graphql";
import ModalHeader from "./components/ModalHeader";
import TicketForm from "./components/TicketForm";

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
  } = useQuery(GET_ORGANISATION, {
    skip: !organisationId,
    variables: { organisationId: organisationId ?? "" },
  });

  const { organisation } = dataOrg ?? {};

  const [addOrEditBoard] = useMutation(PUT_BOARD);
  const [addOrEditTicket] = useMutation(PUT_TICKET);

  const [showAddBoard, setShowAddBoard] = useState<BoardModalState>({
    show: false,
    organisationId: null,
  });

  const [showEditBoard, setShowEditBoard] = useState<
    BoardModalState & { board?: Board | null }
  >({
    show: false,
    organisationId: null,
    board: null,
  });

  const [showAddTicket, setShowAddTicket] = useState<TicketModalState>({
    show: false,
    organisationId: null,
    boardId: null,
  });

  const [showEditTicket, setShowEditTicket] = useState<
    TicketModalState & { ticket?: Ticket | null }
  >({
    show: false,
    organisationId: null,
    boardId: null,
    ticket: null,
  });

  const handleShowAddBoardClick = useCallback(
    (organisationId: string) => setShowAddBoard({ show: true, organisationId }),
    [],
  );

  const handleShowEditBoardClick = useCallback(
    (organisationId: string, board: Board) =>
      setShowEditBoard({ show: true, organisationId, board }),
    [],
  );

  const handleShowAddTicketClick = useCallback(
    (organisationId: string, boardId: string) =>
      setShowAddTicket({ show: true, organisationId, boardId }),
    [],
  );

  const handleShowEditTicketClick = useCallback(
    (organisationId: string, boardId: string, ticket: Ticket) =>
      setShowEditTicket({ show: true, organisationId, boardId, ticket }),
    [],
  );

  const handleAddBoard = useCallback(
    (organisationId: string, board: Board) => {
      addOrEditBoard({
        variables: {
          organisationId,
          input: board,
        },
      });
    },
    [addOrEditBoard],
  );

  const handleEditBoard = useCallback(
    (organisationId: string, board: Board) => {
      addOrEditBoard({
        variables: {
          organisationId,
          boardId: board.id,
          input: board,
        },
      });
    },
    [addOrEditBoard],
  );

  const handleAddTicket = useCallback(
    (organisationId: string, boardId: string, ticket: Ticket) => {
      addOrEditTicket({
        variables: {
          organisationId,
          boardId,
          input: ticket,
        },
      });
    },
    [addOrEditTicket],
  );

  const handleEditTicket = useCallback(
    (organisationId: string, boardId: string, ticket: Ticket) => {
      addOrEditTicket({
        variables: {
          organisationId,
          boardId,
          ticketId: ticket.id,
          input: ticket,
        },
      });
    },
    [addOrEditTicket],
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
        <button onClick={() => handleShowAddBoardClick(organisation.id)}>
          Add board
        </button>

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
                }}
              >
                <h3>{b.name}</h3>
                <button
                  onClick={() =>
                    handleShowEditBoardClick(organisation.id, b as Board)
                  }
                >
                  Edit
                </button>
              </header>

              <div style={{ padding: 4 }}>
                {!b.tickets.length ? (
                  <div>
                    This board as no tickets, yet!{" "}
                    <button
                      onClick={() =>
                        handleShowAddTicketClick(organisation.id, b.id)
                      }
                    >
                      Add ticket
                    </button>
                  </div>
                ) : (
                  <ul>
                    {b.tickets.map((t) => (
                      <li key={t.id}>{t.name}</li>
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

      {showAddBoard.show &&
        showAddBoard.organisationId &&
        createPortal(
          <>
            <Overlay />
            <dialog
              open
              style={{ position: "fixed", top: 50, maxWidth: "90%" }}
            >
              <ModalHeader
                title="Add Board"
                onClose={() => setShowAddBoard({ show: false })}
              />

              <BoardForm
                organisationId={organisation.id}
                onSubmit={handleAddBoard}
                onClose={() => setShowAddBoard({ show: false })}
              />
            </dialog>
          </>,
          document.getElementById("modal")!,
        )}

      {showEditBoard.show &&
        showEditBoard.organisationId &&
        showEditBoard.board &&
        createPortal(
          <>
            <Overlay />
            <dialog
              open
              style={{ position: "fixed", top: 50, maxWidth: "90%" }}
            >
              <ModalHeader
                title="Edit Board"
                onClose={() => setShowEditBoard({ show: false, board: null })}
              />

              <BoardForm
                organisationId={organisation.id}
                board={showEditBoard.board}
                onSubmit={handleEditBoard}
                onClose={() => setShowEditBoard({ show: false, board: null })}
              />
            </dialog>
          </>,
          document.getElementById("modal")!,
        )}

      {showAddTicket.show &&
        showAddTicket.organisationId &&
        showAddTicket.boardId &&
        createPortal(
          <>
            <Overlay />
            <dialog
              open
              style={{ position: "fixed", top: 50, maxWidth: "90%" }}
            >
              <ModalHeader
                title="Add Ticket"
                onClose={() => setShowAddTicket({ show: false })}
              />

              <TicketForm
                organisationId={organisation.id}
                boardId={showAddTicket.boardId}
                onSubmit={(oId, bId, ticket) =>
                  handleAddTicket(oId, bId, ticket)
                }
                onClose={() => setShowAddTicket({ show: false })}
              />
            </dialog>
          </>,
          document.getElementById("modal")!,
        )}

      {showEditTicket.show &&
        showEditTicket.organisationId &&
        showEditTicket.boardId &&
        showEditTicket.ticket &&
        createPortal(
          <>
            <Overlay />
            <dialog
              open
              style={{ position: "fixed", top: 50, maxWidth: "90%" }}
            >
              <ModalHeader
                title="Edit Ticket"
                onClose={() => setShowEditTicket({ show: false })}
              />

              <TicketForm
                organisationId={organisation.id}
                boardId={showEditTicket.boardId}
                ticket={showEditTicket.ticket}
                onSubmit={handleEditTicket}
                onClose={() => setShowEditTicket({ show: false })}
              />
            </dialog>
          </>,
          document.getElementById("modal")!,
        )}
    </>
  );
}
