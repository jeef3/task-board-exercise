import styled from "styled-components";

export type ButtonType = "transparent" | "action" | "destructive";

export interface ButtonProps {
  $active?: boolean;
  $type?: ButtonType;
}

function getBaseColor({ $type = "transparent" }: ButtonProps) {
  switch ($type) {
    case "transparent":
      return "transparent";
    case "action":
      return "hsl(140 85% 35%)";
    case "destructive":
      return "hsl(0 85% 35%)";
  }
}

function getForegroundColor({ $type = "transparent" }: ButtonProps) {
  switch ($type) {
    case "transparent":
      return "color-mix(in hsl, var(--base), black 40%)";
    case "action":
      return "white";
    case "destructive":
      return "white";
  }
}

const Button = styled.button<ButtonProps>`
  --base: ${getBaseColor};
  --foreground: ${getForegroundColor};

  padding: 6px;

  cursor: pointer;
  color: var(--foreground);
  font-size: 14px;

  border: 0;
  border-radius: 6px;
  background: var(--base);

  ${({ $active = false }) =>
    $active &&
    `
  background: color-mix(in hsl, var(--base), black 5%);
  `}

  display: flex;
  align-items: center;
  gap: 4px;

  transition: all 100ms ease-in-out;

  &:hover {
    color: color-mix(in hsl, var(--base), black 50%);
    background: color-mix(in hsl, var(--base), black 8%);
  }

  &:active {
    color: color-mix(in hsl, var(--base), black 50%);
    background: color-mix(in hsl, var(--base), black 10%);
  }
`;

export default Button;
