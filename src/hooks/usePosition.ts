import { useCallback, useRef } from "react";
import { CSSProperties } from "styled-components";

export default function usePosition<T extends HTMLElement>() {
  const targetRef = useRef<T | null>(null);

  const positionProps = useCallback(() => {
    const rect = targetRef.current?.getBoundingClientRect();

    if (!rect) return { style: {} as CSSProperties };

    const { width, x, y } = rect;

    return {
      style: {
        boxSizing: "border-box",
        zIndex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        width,
        transform: `translate3d(${x}px,${y}px,0)`,
      } as CSSProperties,
    };
  }, []);

  return {
    targetRef,
    positionProps,
  };
}
