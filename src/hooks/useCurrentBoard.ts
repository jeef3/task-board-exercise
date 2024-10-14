import { useContext } from "react";
import { CurrentBoardContext } from "./CurrentBoardContext";

export default function useCurrentBoard() {
  return useContext(CurrentBoardContext);
}
