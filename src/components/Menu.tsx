import { IconSquarePlus2 } from "@tabler/icons-react";
import { Board } from "../__generated__/graphql";
import { useCurrentOrg } from "../hooks/hooks";
import useCurrentBoard from "../hooks/useCurrentBoard";
import Button from "./Button";
import { TextLoader } from "./ContentLoader";
import MenuButton from "./MenuButton";

export default function Menu() {
  const { data: { organisation } = {}, loading } = useCurrentOrg();

  const [currentBoard, setCurrentBoard] = useCurrentBoard();

  return (
    <div
      style={{
        overflow: "auto",
        width: 200,
        padding: 8,
        display: "flex",
        flexDirection: "column",
        gap: 0,
        alignItems: "stretch",
        background: "hsl(240 45% 80%)",
      }}
    >
      <h3>Boards</h3>
      {loading || !organisation ? (
        <>
          <MenuButton label={<TextLoader width={90} />} />
          <MenuButton label={<TextLoader width={80} />} />
          <MenuButton label={<TextLoader width={110} />} />
          <MenuButton label={<TextLoader width={90} />} />
        </>
      ) : !organisation.boards.length ? (
        <div>No boards</div>
      ) : (
        organisation?.boards.map((b) => (
          <MenuButton
            label={b.name}
            active={b === currentBoard}
            onClick={() => setCurrentBoard(b as Board)}
          />
        ))
      )}

      <Button onClick={() => showBoardModal()}>
        <IconSquarePlus2 size="1em" /> Add board
      </Button>
    </div>
  );
}
