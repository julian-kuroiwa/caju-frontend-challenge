import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: absolute;
  width: 100vw;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0,0.3);
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: ${spin} 1s infinite linear;
`;
