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
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Icon from "@material-ui/core/Icon";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import EditDialog from './Dialog'
import EditMenu from './EditMenu'

const styles = theme => ({
  primary: {
    textDecoration: "line-through",
    color: "#002984",
    opacity: 0.5
  },
  toolbar: theme.mixins.toolbar,
});


class TodoItem extends React.Component {
	state = {
    open_menu: false,
		anchor: null,
		show_info: false,
  };

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

  handleEditContent = () => {
		this.props.onEditContent(this.props.id, this.props.todo.content);
  };

	//menu for priority and date
	handleMenu = event => {
    this.setState({ anchor: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchor: null });
	};
	
	handleEditPriority = () => {
		this.props.onEditPriority(this.props.id)
	}

	handleEditDate = () => {
		this.props.onEditDate(this.props.id)
	}

	showInfo = () => {
		this.setState({show_info: true})
	}
	onInfoClose = () => {
		this.setState({show_info: false})
	}

  render() {
    const { todo } = this.props;
    const { classes } = this.props;
    var itemClass = todo.finished ? classes.primary : null;
    return (
			<div>
				<ListItem key={todo.id} role={undefined} dense button
					onClick={this.showInfo}>
        <Checkbox
          checked={todo.finished}
          tabIndex={-1}
					onClick={this.onMarkItem}
					color="primary"
        />
        <ListItemText primary={todo.content} className={itemClass} />
        <ListItemSecondaryAction className={classes.toolbar}>
          <IconButton aria-label="Edit">
            <EditIcon onClick={this.handleEditContent} />
          </IconButton>
          <IconButton aria-label="Delete">
            <DeleteIcon onClick={this.onDeleteItem} />
          </IconButton>
					
					<IconButton
          aria-haspopup="true"
          aria-owns="menu-appbar"
          onClick={this.handleMenu}
        >
          <MoreIcon />
        </IconButton>
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
          <MenuItem onClick={this.handleEditPriority}>优先级</MenuItem>
          <MenuItem onClick={this.handleEditDate}>截止时间</MenuItem>
        </Menu>

        </ListItemSecondaryAction>
      </ListItem>

			<Dialog
					open={this.state.show_info}
					onClose={this.onInfoClose}
					aria-labelledby="edit-form-dialog"
				>
					<DialogTitle id="edit-form-dialog">项目信息</DialogTitle>
					<DialogContent>
						<DialogContentText>
							内容：{todo.content} / 优先级：{todo.priority} / 截止时间：{todo.expire_date}
						</DialogContentText>			
					</DialogContent>
					<DialogActions>
						<Button onClick={this.onInfoClose} color="primary">
							确认
						</Button>
					</DialogActions>
				</Dialog>
			</div>
      
    );
  }
}

export default withStyles(styles)(TodoItem);
