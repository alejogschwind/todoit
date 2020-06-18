import React from "react";
import styled from 'styled-components';

import { routes } from "../routes";

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <AppWrapper>
      {routes}
    </AppWrapper>
  );
}

export default App;
