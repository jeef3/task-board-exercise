import styled from "styled-components";

const UnstyledList = styled.ul<{
  $direction?: "column" | "row";
  $gutter?: number;
}>`
  margin: 0;
  padding: 0;

  list-style: none;

  display: flex;
  flex-direction: ${({ $direction = "row" }) => $direction};
  gap: ${({ $gutter = 4 }) => $gutter}px;
`;

export default UnstyledList;
