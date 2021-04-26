import * as React from "react";
import styled from "styled-components";

const StyledStatus = styled.div`
  height: 15px;
  width: 15px;
  background-color: ${props => props.color};
  display: inline-block;
  opacity: 0.5;
`;
export function Status({ active }) {
    const color = active ? "darkgreen" : "darkred";
    return <StyledStatus color={color} />;
}
