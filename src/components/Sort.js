import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";

class SortPanel extends React.Component {
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
        <Button variant="contained" >
          排序
        </Button>
        <Menu
          id="menu-appbar"
          open={this.state.anchor}
          onClose={this.handleClose}
          anchorEl={this.state.anchor}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <MenuItem onClick={this.handleClose}>默认</MenuItem>
          <MenuItem onClick={this.handleClose}>优先级</MenuItem>
					<MenuItem onClick={this.handleClose}>截止时间</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SortPanel;
