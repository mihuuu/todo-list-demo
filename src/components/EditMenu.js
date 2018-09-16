import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";

class EditMenu extends React.Component {
  state = {
    open_menu: false,
    anchor: null
  };

  handleMenu = event => {
    this.setState({ anchor: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchor: null });
  };

  render() {
    return (
      <div>
        <IconButton
          aria-haspopup="true"
          aria-owns="menu-appbar"
          onClick={this.handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          open={this.state.anchor}
          onClose={this.handleClose}
          anchorEl={this.state.anchor}
          anchorOrigin={{
            horizontal: "right"
          }}
          transformOrigin={{
            horizontal: "right"
          }}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
        </Menu>
      </div>
    );
  }
}


export default EditMenu;