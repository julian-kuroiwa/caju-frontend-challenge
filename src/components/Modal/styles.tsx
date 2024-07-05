import styled from 'styled-components';

export const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`
  border: 0;
  border-radius: 8px;
  padding: 24px;
  position: absolute;
  background-color: #fff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.35);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
`;

export const Content = styled.div``;

export const Close = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: transparent;
  text-transform: uppercase;
  border: 0;
  padding: 5px;
  cursor: pointer;
`;
