import { useEffect, useRef, useState } from "react";
import ContentLoader from "react-content-loader";
import styled from "styled-components";

const TextLoaderContainer = styled.span`
  & > svg {
    display: block;
  }
`;

export const TextLoader = ({ width }: { width: number }) => {
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
      <ContentLoader
        foregroundColor="hsl(0 0% 70% / 50%)"
        backgroundColor="hsl(0 0% 60% / 50%)"
        title="Loading…"
        width={width}
        height={boxHeight}
        viewBox={`0 0 ${width} ${boxHeight}`}
      >
        <rect y={textHeight * 0.2} width={width} height={textHeight} rx={4} />
      </ContentLoader>
    </TextLoaderContainer>
  );
};
