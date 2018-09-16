import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { MenuItem } from "@material-ui/core";


class EditDialog extends React.Component {
	state = {
		content: this.props.content,
	}

	handleDialogClose = () => {
		this.props.onClose();
	}

	onChange = (e) => {
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
					id: this.props.id,
					content: this.state.content,
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
					<DialogTitle id="edit-form-dialog">编辑项目</DialogTitle>
					<DialogContent>
						<DialogContentText>
							修改项目内容:                                                         
						</DialogContentText>
						<TextField
								autoFocus margin="dense" id="content" name="content"
								label="待办内容" type="text" fullWidth
								onChange={this.onChange}
							/>
									
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