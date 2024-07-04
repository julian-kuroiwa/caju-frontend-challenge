import styled from "styled-components";

export const Container = styled.dialog`
  border: 0;
  border-radius: 8px;
  padding: 32px;

  &::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
`;

export const Content = styled.div`
  padding: 16px;
`

export const Close = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  text-transform: uppercase;
  border: 0;
  padding: 5px;
  cursor: pointer;
`