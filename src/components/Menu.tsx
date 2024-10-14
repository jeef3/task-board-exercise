import { IconSquarePlus2 } from "@tabler/icons-react";
import { Board } from "../__generated__/graphql";
import { useCurrentOrg } from "../hooks/hooks";
import useCurrentBoard from "../hooks/useCurrentBoard";
import Button from "./Button";
import { TextLoader } from "./ContentLoader";
import MenuButton from "./MenuButton";
import {
  SidePanel,
  SidePanelContent,
  SidePanelFooter,
  SidePanelTitle,
} from "./atoms/MenuAtoms";

export default function Menu() {
  const { data: { organisation } = {}, loading } = useCurrentOrg();

  const [currentBoard, setCurrentBoard] = useCurrentBoard();

  return (
    <SidePanel>
      <SidePanelTitle>Boards</SidePanelTitle>

      <SidePanelContent style={{ overflow: "auto" }}>
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
      </SidePanelContent>

      <SidePanelFooter>
        <Button onClick={() => showBoardModal()}>
          <IconSquarePlus2 size="1em" /> Add board
        </Button>
      </SidePanelFooter>
    </SidePanel>
  );
}
