import React from "react";
import styled from "styled-components";

const Spiner = styled.div`
  border: 8px solid rgba(49, 45, 45, 0.15);
  border-left-color: #2196f3;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => <Spiner></Spiner>;

export default Loading;
