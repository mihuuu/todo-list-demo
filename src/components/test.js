import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

const styles = theme => ({
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		minWidth: 0, // So the Typography noWrap works
	},
	toolbar: theme.mixins.toolbar,
});


const todos = [
	{id:1, content:"read books", finished: true, priority:2},
	{id:2, content:"learn C++", finished: false, priority:1},
	{id:3, content:"running", finished: false, priority:3},
]

class CheckboxList extends React.Component {
	state = {
		checked: [0],
	};

	handleToggle = value => () => {
		const { checked } = this.state;
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		this.setState({
			checked: newChecked,
		});
	};

	render() {
		const { classes } = this.props;

		return (
				<div>
					<div className={classes.toolbar} />
      
			<List>
				{[0, 1, 2, 3].map(value => (
					<ListItem
						key={value}
						role={undefined}
						dense
						button
						onClick={this.handleToggle(value)}
						className={classes.listItem}
					>
						<Checkbox
							checked={this.state.checked.indexOf(value) !== -1}
							tabIndex={-1}
							disableRipple
						/>
						<ListItemText primary={`Line item ${value + 1}`} />
						<ListItemSecondaryAction>
							<IconButton aria-label="Comments">
								<CommentIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
				</div>
		);
	}
}

CheckboxList.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxList);
