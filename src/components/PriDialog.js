import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { MenuItem } from "@material-ui/core";

const options = [
  { value: 1, label: '紧急', },
	{ value: 2, label: '重要', },
	{ value: 3, label: '一般', },
];

class PriDialog extends React.Component {
	state = {
		priority: '一般',
	}

	handleDialogClose = () => {
		this.props.onClose();
	}
	
	// getValue = (label) => {
	// 	//todos.filter(todo => todo.finished !== true).length
	// 	console.log("getLabel value:" + label)
	// 	for(var item in options) {
	// 		if(item.label == label) {
	// 			console.log("after function:" + item.value);
	// 			return item.value;
	// 		}
	// 	}
		
	// }

	onChange = (e) => {
		this.setState({
			'priority': e.target.value,
		})
	}
	onEditItem = () => {
		const edit_url = "http://127.0.0.1:8000/api/edit_priority/";
		const {priority} = this.state;

		if(priority != '') {
			fetch(edit_url, {
				method: 'POST',
				headers: {'Content-Type': 'application/json',},
				body: JSON.stringify({
					id: this.props.id,
					priority: priority,
				})
			}).then(
				res => res.json()
			).then(res => {
				console.log("edit ok")
				this.props.onClose();
				this.props.onUpdateList();
			});
		} else {
			console.log("input is empty!")
		}
	}

	render() {
		return (
			<div>
				<Dialog
					open={this.props.open}
					onClose={this.handleDialogClose}
					aria-labelledby="edit-form-dialog"
				>
					<DialogTitle id="edit-form-dialog">编辑优先级</DialogTitle>
					<DialogContent>
						<DialogContentText>
							三种优先级：紧急 / 重要 / 一般
						</DialogContentText>
						<TextField
							id="select-priority"
							select
							label="Select"
							value={this.state.priority}
							onChange={this.onChange}
							helperText="Please select your currency"
							margin="normal"
						>
							{options.map(option => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
									
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleDialogClose} color="primary">
							取消
						</Button>
						<Button onClick={this.onEditItem} color="primary">
							确认
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}


export default PriDialog;