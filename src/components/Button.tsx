import styled from "styled-components";

const Button = styled.button<{
  $type: "transparent" | "action" | "destructive";
}>`
  --base: ${({ $type = "transparent" }) =>
    $type === "transparent" ? "transparent" : "hsl(0 0% 95%)"};

  padding: 6px;

  cursor: pointer;
  color: color-mix(in hsl, var(--base), black 40%);

  border: 0;
  border-radius: 6px;
  background: var(--base);

  display: flex;
  align-items: center;
  gap: 4px;

  transition: all 100ms ease-in-out;

  &:hover {
    color: color-mix(in hsl, var(--base), black 50%);
    background: color-mix(in hsl, var(--base), black 5%);
  }

  &:active {
    color: color-mix(in hsl, var(--base), black 50%);
    background: color-mix(in hsl, var(--base), black 10%);
  }
`;

export default Button;
