import { ReactNode } from "react";
import Overlay from "./Overlay";

export default function Modal({ children }: { children: ReactNode }) {
  return (
    <>
      <Overlay />
      <dialog open style={{ position: "fixed", top: 50, maxWidth: "90%" }}>
        {children}
      </dialog>
    </>
  );
}
