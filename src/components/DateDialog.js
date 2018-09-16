import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { MenuItem } from "@material-ui/core";


class DateDialog extends React.Component {
	state = {
		date: this.props.date,
	}

	handleDialogClose = () => {
		this.props.onClose();
	}

	onChange = (e) => {
		this.setState({
			'content': e.target.value,
		})
	}
	//seems can't get date
	onSubmit = (e) => {
		const new_date = e.target.value;
		this.setState({
			date: new_date
		})
		console.log("new date" + new_date)
		
		this.onEditItem();
	}

	onEditItem = () => {
		const edit_url = "http://127.0.0.1:8000/api/edit_time/";
		const {date} = this.state;
		if(date != '') {
			alert(this.state.date);
			fetch(edit_url, {
				method: 'POST',
				headers: {'Content-Type': 'application/json',},
				body: JSON.stringify({
					id: this.props.id,
					expire_date: this.state.date,
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
				<form onSubmit={this.onEditItem}>
					<DialogTitle id="edit-form-dialog">编辑项目</DialogTitle>
					<DialogContent>
						<DialogContentText>
							修改截止时间：Year/Month/Day/Time                                                       
						</DialogContentText>
						
						<TextField
							id="datetime-local"
							//label="截止时间"
							type="datetime-local"
							defaultValue="2018-10-01T10:30"
							InputLabelProps={{
								shrink: true,
							}}
							onChange={this.onChange}
							name="date"
							id="date"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleDialogClose} color="primary">
							取消
						</Button>
						<Button onClick={this.onSubmit} color="primary">
							确认
						</Button>
					</DialogActions>
							</form>	
				</Dialog>
	
			</div>
		)
	}
}


export default DateDialog;