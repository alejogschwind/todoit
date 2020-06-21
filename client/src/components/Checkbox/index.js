import React from "react";
import styled from "styled-components";

import { ReactComponent as BoxIcon } from "../../assets/box.svg";
import { ReactComponent as CheckboxIcon } from "../../assets/checkbox.svg";

const CheckboxWrapper = styled.div`
  height: 27px;
  width: 27px;
  cursor: pointer;
`

const Checkbox = ({ check, setCheck}) => {
  return (
    <CheckboxWrapper onClick={() => setCheck(!check)}>
      {check ? <CheckboxIcon /> : <BoxIcon />}
    </CheckboxWrapper>
  );
};

export default Checkbox;
