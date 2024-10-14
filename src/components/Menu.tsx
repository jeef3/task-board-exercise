import { IconSquarePlus2 } from "@tabler/icons-react";
import { Board } from "../__generated__/graphql";
import { useCurrentOrg } from "../hooks/hooks";
import Button from "./Button";
import { TextLoader } from "./ContentLoader";
import BoardButton from "./BoardButton";
import {
  SidePanel,
  SidePanelContent,
  SidePanelFooter,
  SidePanelTitle,
} from "./atoms/MenuAtoms";

const BoardButtonLoading = () => (
  <div style={{ padding: 2 }}>
    <TextLoader width={90} />
  </div>
);

export default function Menu() {
  const { data: { organisation } = {}, loading } = useCurrentOrg();

  return (
    <SidePanel>
      <SidePanelTitle>Boards</SidePanelTitle>

      <SidePanelContent style={{ overflow: "auto" }}>
        {loading || !organisation ? (
          <>
            <BoardButtonLoading />
            <BoardButtonLoading />
            <BoardButtonLoading />
            <BoardButtonLoading />
            <BoardButtonLoading />
          </>
        ) : !organisation.boards.length ? (
          <div>No boards</div>
        ) : (
          organisation?.boards.map((b) => <BoardButton board={b as Board} />)
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
