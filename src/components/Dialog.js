import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { MenuItem } from "@material-ui/core";


const prioritys = [
	{ value: 1, label: '紧急'},
	{ value: 2, label: '重要'},
	{ value: 3, label: '一般'},
]

class EditDialog extends React.Component {
	state = {
		content: '',
		priority: 0,
		date: null
	}

	handleDialogClose = () => {
		this.props.onClose();
	}

	onChange = name => event => {
		this.setState({
			[name]: event.target.value,
		})
	}
	onContentChange = (e) => {
		this.setState({
			'content': e.target.value,
		})
	}
	onEditItem = () => {
		const edit_url = "http://127.0.0.1:8000/api/edit_todo/";
		const {content} = this.state;
		if(content != '') {
			fetch(edit_url, {
				method: 'POST',
				headers: {'Content-Type': 'application/json',},
				body: JSON.stringify({
					id: this.props.item.id,
					content: content,
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

	componentWillMount = () => {
		const find_url = "http://127.0.0.1:8000/api/get_todo/";
		fetch(find_url, {
			method: 'POST',
			headers: {'Content-Type': 'application/json',},
			body: JSON.stringify({
				id: this.props.id,
			})
		}).then(
			res => res.json()
		).then(res => {
			console.log(res);
			this.setState({
				content: res.content,
				priority: res.priority,
				date: res.expire_date,
			});
			console.log("get content:"+this.state.content)
		});
	
	}
	
	GetPriority = () => {
		var op = prioritys.filter(option => 
			{option.value === this.props.item.priority}
		)
		return op.label;
		console.log("get pri:" + op.label);
	}

	render() {
		return (
			<div>
				<Dialog
					open={this.props.open}
					onClose={this.handleDialogClose}
					aria-labelledby="edit-form-dialog"
				>
					<DialogTitle id="edit-form-dialog">编辑项目</DialogTitle>
					<DialogContent>
						{/* <DialogContentText>
							你可以修改项目的内容、截止时间、优先级。
						</DialogContentText> */}
						
						<TextField
								autoFocus margin="dense" id="content" name="content"
								label="待办内容" type="text" fullWidth
								onChange={this.onContentChange} value={this.state.content}
							/>
							{/* <TextField
								autoFocus margin="dense" id="priority" name="priority"
								label="优先级" select fullWidth
								onChange={this.onChange('priority')} 
								
							>
							 {prioritys.map(option => (
								 <MenuItem key={option.value} value={option.value}>
								 	{option.label}
								 </MenuItem>
							 ))}
							</TextField>
							<TextField
								autoFocus margin="dense" id="date" name="date"
								label="截止时间" type="text" fullWidth
								onChange={this.onChange} value={this.props.item.date}
							/> */}
						
							
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


export default EditDialog;