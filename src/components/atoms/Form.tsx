import styled from "styled-components";

export const InlineInput = styled.input`
  display: block;
  width: 100%;
  height: 100%;
  min-width: 1px;
  margin: -2px;
  padding: 2px;

  outline: 0;
  color: hsl(0 0% 10%);

  border: 0;
  border-radius: 6px;

  background: transparent;

  &:focus {
    background: hsl(0 0% 90%);
  }
`;

export const InlineTextArea = styled.textarea`
  display: block;
  width: 100%;
  height: 100%;
  min-width: 1px;
  margin: -2px;
  padding: 2px;

  outline: 0;
  color: hsl(0 0% 10%);

  border: 0;
  border-radius: 6px;

  background: transparent;

  &:focus {
    background: hsl(0 0% 90%);
  }
`;
