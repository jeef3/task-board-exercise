import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { Board } from "../__generated__/graphql";

export const CurrentBoardContext = createContext<
  [current: Board | null, setCurrent: Dispatch<SetStateAction<Board | null>>]
>([null, () => null]);

export function CurrentBoardProvider({ children }: { children: ReactNode }) {
  const current = useState<Board | null>(null);

  return (
    <CurrentBoardContext.Provider value={current}>
      {children}
    </CurrentBoardContext.Provider>
  );
}
