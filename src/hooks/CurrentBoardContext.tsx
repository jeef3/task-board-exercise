import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { Board } from "../__generated__/graphql";
import { useCurrentOrg } from "./hooks";

export const CurrentBoardContext = createContext<
  [current: Board | null, setCurrent: Dispatch<SetStateAction<Board | null>>]
>([null, () => null]);

export function CurrentBoardProvider({ children }: { children: ReactNode }) {
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);

  const { data: { organisation } = {} } = useCurrentOrg();

  useEffect(() => {
    if (!organisation) return;

    const firstBoard = organisation.boards[0];

    if (!firstBoard) return;

    setCurrentBoard(firstBoard as Board);
  }, [organisation]);

  return (
    <CurrentBoardContext.Provider value={[currentBoard, setCurrentBoard]}>
      {children}
    </CurrentBoardContext.Provider>
  );
}
