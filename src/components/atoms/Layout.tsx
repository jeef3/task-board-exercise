import styled, { keyframes } from "styled-components";

export const ButtonBar = styled.div<{ $disabled?: boolean }>`
  display: flex;
  gap: 4px;
`;

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spin = styled.div`
  transform-origin: center center;
  animation: ${rotate} 900ms linear infinite;
`;
