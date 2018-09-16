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
import EditDialog from './Dialog'

const styles = theme => ({
  primary: {
    textDecoration: "line-through",
    color: "#E91E63",
    opacity: 0.5
  },
  toolbar: theme.mixins.toolbar,
});


class TodoItem extends React.Component {
	// state = {
	// 	show_dialog: false,
	// }

	onDeleteItem = () => {
		const delete_url = "http://127.0.0.1:8000/api/delete_todo/";
		fetch(delete_url, {
			method: 'POST',
			headers: {'Content-Type': 'application/json',},
			body: JSON.stringify({
				id: this.props.id,
			})
		}).then(
			res => res.json()
		).then(res => {
			console.log("delete ok")
			this.props.onUpdateList();
		});
		
	};

	handleUpdateItem = () => {
		this.props.onUpdateList();
	}

	onMarkItem = () => {
    const mark_url = "http://127.0.0.1:8000/api/mark_todo/";
		fetch(mark_url, {
			method: 'POST',
			headers: {'Content-Type': 'application/json',},
			body: JSON.stringify({
				id: this.props.id,
			})
		}).then(
			res => res.json()
		).then(res => {
			console.log("mark ok")
			this.props.onUpdateList();
		});
  };

  handleEditItem = () => {
		this.props.onEditItem(this.props.id);
  };


  render() {
    const { todo } = this.props;
    const { classes } = this.props;
    var itemClass = todo.finished ? classes.primary : null;
    return (
			<div>
				<ListItem key={todo.id} role={undefined} dense button>
        <Checkbox
          checked={todo.finished}
          tabIndex={-1}
          onClick={this.onMarkItem}
        />
        <ListItemText primary={todo.content} className={itemClass} />
        <ListItemSecondaryAction className={classes.toolbar}>
          <IconButton aria-label="Edit">
            <EditIcon onClick={this.handleEditItem} />
          </IconButton>
          <IconButton aria-label="Delete">
            <DeleteIcon onClick={this.onDeleteItem} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
			</div>
      
    );
  }
}

export default withStyles(styles)(TodoItem);
