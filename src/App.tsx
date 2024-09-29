import { useQuery, useMutation } from "@apollo/client";
import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import BoardForm from "./components/BoardForm";
import Overlay from "./components/Overlay";
import { GET_ME, GET_ORGANISATION, PUT_BOARD } from "./queries";
import { Board } from "./__generated__/graphql";

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

  const [addBoard] = useMutation(PUT_BOARD);

  const [showAddBoard, setShowAddBoard] = useState(false);

  const handleShowAddBoardClick = useCallback(() => {
    setShowAddBoard(true);
  }, []);

  const handleAddBoard = useCallback(
    (board: Board) => {
      addBoard({
        variables: {
          organisationId: organisationId ?? "",
          input: { name: board.name },
        },
      });
    },
    [addBoard, organisationId],
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

        <div>
          {organisation.boards.map((b) => (
            <article key={b.id}>
              <header
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h3>{b.name}</h3>
                <button>Edit</button>
              </header>

              <div>
                <ul></ul>
              </div>
            </article>
          ))}
        </div>

        <div
          style={{ padding: 8, borderRadius: 8, background: "hsl(0 0% 95%)" }}
        >
          <pre>{JSON.stringify(dataMe, null, 2)}</pre>
          <pre>{JSON.stringify(dataOrg, null, 2)}</pre>
        </div>
      </div>

      {showAddBoard &&
        createPortal(
          <>
            <Overlay />
            <dialog
              open
              style={{ position: "fixed", top: 50, maxWidth: "90%" }}
            >
              <button onClick={() => setShowAddBoard(false)}>Close</button>
              <h2>Add Board</h2>
              <BoardForm
                onSubmit={handleAddBoard}
                onClose={() => setShowAddBoard(false)}
              />
            </dialog>
          </>,
          document.getElementById("modal")!,
        )}
    </>
  );
}
