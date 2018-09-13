import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TodoItem from './Item'
import {observer} from "mobx-react";;

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
class TodoList extends React.Component {
	AddNewTodo = () => {
		this.props.store.AddTodo(
			prompt('Enter new todo:','coffee plz')
		);
	}

	render() {
		const { classes } = this.props;
		const {store} = this.props;

		const item = todos.map((todo) => {
			<TodoItem todo={todo} key={todo.id}/>
		})
		
		return (
		<div>
			<div className={classes.toolbar} />
				{ store.report }
				<List>
					{item}
				</List>
				<button onClick={ this.AddNewTodo }>New Todo</button>
        <small> (double-click a todo to edit)</small>
			</div>
		);
	}
}

TodoList.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoList);
