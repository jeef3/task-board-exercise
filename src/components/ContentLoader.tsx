import { ReactElement, useEffect, useRef, useState } from "react";
import CL from "react-content-loader";
import styled from "styled-components";

const TextLoaderContainer = styled.span`
  & > svg {
    display: block;
  }
`;

const ContentLoader = ({
  children,
  width,
  height,
}: {
  children?: ReactElement;
  width?: string | number;
  height?: string | number;
}) => (
  <CL
    foregroundColor="hsl(0 0% 70% / 20%)"
    backgroundColor="hsl(0 0% 60% / 20%)"
    title="Loading…"
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
  >
    {children}
  </CL>
);

export function TextLoader({ width }: { width: number }) {
  const el = useRef<HTMLSpanElement>(null);

  const [boxHeight, setBoxHeight] = useState<number>(0);
  const [textHeight, setTextHeight] = useState<number>(0);

  useEffect(() => {
    if (!el.current) {
      setBoxHeight(0);
      setTextHeight(0);
      return;
    }

    const spacer = document.createElement("div");
    spacer.innerHTML = "&nbsp;";
    el.current.appendChild(spacer);

    const { height } = el.current.getBoundingClientRect();
    el.current.removeChild(spacer);

    setBoxHeight(height);

    const { fontSize } = getComputedStyle(el.current);
    setTextHeight(Number(fontSize.slice(0, -2)));
  }, []);

  return (
    <TextLoaderContainer ref={el}>
      <ContentLoader width={width} height={boxHeight}>
        <rect y={textHeight * 0.2} width={width} height={textHeight} rx={4} />
      </ContentLoader>
    </TextLoaderContainer>
  );
}

export function BoxLoader({
  width = "100%",
  height = 10,
  radius = 4,
}: {
  width?: string | number;
  height?: string | number;
  radius?: number;
}) {
  return (
    <ContentLoader width={width} height={height}>
      <rect width={width} height={height} rx={radius} />
    </ContentLoader>
  );
}
