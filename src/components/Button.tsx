import styled from "styled-components";

const Button = styled.button<{
  $active?: boolean;
  $type?: "transparent" | "action" | "destructive";
}>`
  --base: ${({ $type = "transparent" }) =>
    $type === "transparent" ? "transparent" : "hsl(0 0% 95%)"};

  padding: 6px;

  cursor: pointer;
  color: color-mix(in hsl, var(--base), black 40%);

  border: 0;
  border-radius: 6px;
  background: var(--base);

  ${({ $active = false }) =>
    $active &&
    `
  background: color-mix(in hsl, var(--base), black 5%);
  box-shadow: inset 0 1px 2px hsl(0 0% 0% / 20%);
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
