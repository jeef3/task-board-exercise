import { ReactElement } from "react";
import Overlay from "./Overlay";

export default function Modal({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  return (
    <>
      <Overlay />
      <dialog open style={{ position: "fixed", top: 50, maxWidth: "90%" }}>
        {children}
      </dialog>
    </>
  );
}
