import { MouseEventHandler, ReactNode, useState } from "react";
import { IconPencil } from "@tabler/icons-react";
import styled from "styled-components";

import Button from "./Button";

const Container = styled(Button)`
  padding: 2px;

  border-radius: 8px;

  display: grid;
  grid-template-columns: 1fr auto;

  &:hover {
  }
`;

export default function MenuButton({
  label,
  active = false,
  onClick,
}: {
  label: ReactNode;
  active?: boolean;
  onClick?: MouseEventHandler;
}) {
  const [hover, setHover] = useState(false);

  return (
    <Container
      as="div"
      $active={active}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <div
        style={{
          padding: 4,
          fontWeight: active ? 600 : 400,
          color: active ? "black" : "inherit",
        }}
        onClick={onClick}
      >
        {label}
      </div>

      <Button title="Rename board" style={{ opacity: hover ? 1 : 0 }}>
        <IconPencil size="1em" />
      </Button>
    </Container>
  );
}
