import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  primary: {
    textDecoration: "line-through",
    color: "#E91E63",
    opacity: 0.5
  },
  toolbar: theme.mixins.toolbar,
});

class TodoItem extends React.Component {
  handleDeleteItem = () => {
    this.props.onDeleteItem(this.props.id);
  };

  handleEditItem = () => {
    this.props.onEditItem(this.props.id);
    sessionStorage.setItem("id", JSON.stringify(this.props.id));
  };

  handleMarkItem = () => {
    this.props.onMarkItem(this.props.id);
  };

  render() {
    const { todo } = this.props;
    const { classes } = this.props;
    var itemClass = todo.finished ? classes.primary : null;
    return (
      <ListItem key={todo.id} role={undefined} dense button>
        <Checkbox
          checked={todo.finished}
          tabIndex={-1}
          onClick={this.handleMarkItem}
        />
        <ListItemText primary={todo.content} className={itemClass} />
        <ListItemSecondaryAction className={classes.toolbar}>
          <IconButton aria-label="Edit">
            <EditIcon onClick={this.handleEditItem} />
          </IconButton>
          <IconButton aria-label="Delete">
            <DeleteIcon onClick={this.handleDeleteItem} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default withStyles(styles)(TodoItem);
