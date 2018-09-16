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

GetPriority = () => {
    var op = prioritys.filter(option => 
        {option.value === this.props.item.priority}
    )
    return op.label;
    console.log("get pri:" + op.label);
}
