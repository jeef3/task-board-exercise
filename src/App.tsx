import { useQuery, useMutation } from "@apollo/client";
import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import BoardForm from "./components/BoardForm";
import Overlay from "./components/Overlay";
import { GET_ME, GET_ORGANISATION, PUT_BOARD } from "./queries";
import { Board } from "./__generated__/graphql";
import ModalHeader from "./components/ModalHeader";

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

  const [showAddBoard, setShowAddBoard] = useState(false);
  const [showEditBoard, setShowEditBoard] = useState<{
    show: boolean;
    board: Board | null;
  }>({
    show: false,
    board: null,
  });

  const handleShowAddBoardClick = useCallback(() => {
    setShowAddBoard(true);
  }, []);

  const handleShowEditBoardClick = useCallback((board: Board) => {
    setShowEditBoard({ show: true, board });
  }, []);

  const handleAddBoard = useCallback(
    (board: Board) => {
      addOrEditBoard({
        variables: {
          organisationId: organisationId ?? "",
          input: { name: board.name },
        },
      });
    },
    [addOrEditBoard, organisationId],
  );

  const handleEditBoard = useCallback(
    (board: Board) => {
      addOrEditBoard({
        variables: {
          organisationId: organisationId ?? "",
          boardId: board.id,
          input: { name: board.name },
        },
      });
    },
    [addOrEditBoard, organisationId],
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
        <button onClick={handleShowAddBoardClick}>Add board</button>

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
                <button onClick={() => handleShowEditBoardClick(b as Board)}>
                  Edit
                </button>
              </header>

              <div style={{ padding: 4 }}>
                {!b.tickets.length ? (
                  "This board as no tickets, yet!"
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

      {showAddBoard &&
        createPortal(
          <>
            <Overlay />
            <dialog
              open
              style={{ position: "fixed", top: 50, maxWidth: "90%" }}
            >
              <ModalHeader
                title="Add Board"
                onClose={() => setShowAddBoard(false)}
              />

              <BoardForm
                onSubmit={handleAddBoard}
                onClose={() => setShowAddBoard(false)}
              />
            </dialog>
          </>,
          document.getElementById("modal")!,
        )}

      {showEditBoard.show &&
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
                board={showEditBoard.board}
                onSubmit={handleEditBoard}
                onClose={() => setShowEditBoard({ show: false, board: null })}
              />
            </dialog>
          </>,
          document.getElementById("modal")!,
        )}
    </>
  );
}
