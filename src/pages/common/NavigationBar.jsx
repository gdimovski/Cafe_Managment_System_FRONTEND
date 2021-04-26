import React from "react";
import styled from "styled-components";
import Divider from "@material-ui/core/Divider/Divider";
import Drawer from "@material-ui/core/Drawer/Drawer";
import ListItem from "@material-ui/core/ListItem/ListItem";
import List from "@material-ui/core/List/List";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import PersonIcon from "@material-ui/icons/PersonPin";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton/IconButton";
import { withRouter } from "react-router-dom";

const Container = styled.div`
  padding: 10px;
  background-color: white;
  position: fixed;
  height: 40px;
  top: 0;
  left: 0;
  right: 0;
  margin-top: 0;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const StyledIconButton = styled(IconButton)`
  float: right;
`;

class NavigationBar extends React.Component {
    state = { open: false };

    handleToggleDrawer = () => {
        const { open } = this.state;
        this.setState({ open: !open });
    };

    render() {
        const { history } = this.props;
        const actions = [
            {
                label: "Tables",
                location: "/desks/"
            },
            {
                label: "Products",
                location: "/products/"
            },
            {
                label: "Receipts",
                location: "/receipts/"
            },
            {
                label: "Orders all",
                location: "/orders/all"
            }
        ];

        return (
            <Container>
                <Drawer
                    anchor="right"
                    open={this.state.open}
                    onClose={this.handleToggleDrawer}
                >
                    <Divider />
                    <List>
                        {actions.map(item => (
                            <ListItem
                                button
                                key={item.label}
                                onClick={() => {
                                    const { open } = this.state;

                                    history.push(item.location);
                                    this.setState({ open: !open });
                                }}
                            >
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItem>
                        ))}
                        <hr />

                    </List>
                </Drawer>
                <StyledIconButton
                    aria-label="Menu"
                    color="inherit"
                    onClick={this.handleToggleDrawer}
                >
                    <MenuIcon />
                </StyledIconButton>
            </Container>
        );
    }
}


export default withRouter(NavigationBar);