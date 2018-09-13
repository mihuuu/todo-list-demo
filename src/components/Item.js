import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import { observable } from 'mobx';
import {observer} from "mobx-react";

const styles = theme => ({
	content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});


@observer
class TodoItem extends Component {

	handleToggle = () => {
		const todo = this.props.todo;
		todo.completed = !todo.completed;
	}

	handleEdit = () => {
		const todo = this.props.todo;
		todo.task = prompt('Task name', todo.content) || todo.content;
	}

	render() {
		const {classes} = this.props;
		const {todo} = this.props;

		return (
			<ListItem
				className={classes.listItem}
				key={todo.id}
				role={undefined}
				dense
				button
				onClick={this.handleToggle}
				onDoubleClick={this.handleEdit}
			>
				<Checkbox
					checked={todo.completed}
					disableRipple
				/>
				<ListItemText primary={todo.content} />	//not sure
				<ListItemSecondaryAction>
					<IconButton aria-label="Comments">
						<CommentIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		)
	}
}

export default withStyles(styles)(TodoItem);

