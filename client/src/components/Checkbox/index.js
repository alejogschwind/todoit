import React from "react";
import styled from "styled-components";

import { ReactComponent as BoxIcon } from "../../assets/box.svg";
import { ReactComponent as CheckboxIcon } from "../../assets/checkbox.svg";

const CheckboxWrapper = styled.div`
  height: 27px;
  width: 27px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const Checkbox = ({ check, handleUpdate }) => {
  return (
    <CheckboxWrapper onClick={handleUpdate}>
      {check ? <CheckboxIcon /> : <BoxIcon />}
    </CheckboxWrapper>
  );
};

export default Checkbox;
