import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import NavigationBar from "../common/NavigationBar";

const Content = styled.div`
  margin-top: 100px;
  margin-bottom: 25px;
`;

function Bootstrapper(props) {
    return (
        <React.Fragment>
            <NavigationBar />
            <Content>
                {props.children}
            </Content>
        </React.Fragment>
    );
}

export default withRouter(Bootstrapper);
