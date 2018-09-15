import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TodoItem from "./Item";
// import EditDialog from "./Dialog";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
	},
	toolbar: theme.mixins.toolbar,
	content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
});

class TodoList extends React.Component {
  state = {
    input: "",
    todos: [],
    show_dialog: false,
    new_content: ""
  };

  componentDidMount() {
    var todos_url = "http://127.0.0.1:8000/api/all/";
    fetch(todos_url, {
      method: "GET",
      mode: "cors"
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(res => {
        this.setState({"todos": res});
      })
  }

  TodosCount = () => {
    const { todos } = this.state;
    return todos.filter(todo => todo.finished !== true).length;
  };

  onAddChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const input = this.state.input;
    if (input != "") {
      var item = {
        content: this.state.input,
        finished: false,
        id: Date.now()
      };
      this.setState({
        todos: [...this.state.todos, item],
        input: ""
      });
      console.log("new key:" + item.key);
    }

    console.log(this.state.todos);
  };

  onDeleteItem = id => {
    var updated_list = this.state.todos.filter(function(item) {
      return item.id != id;
    });
    this.setState({
      todos: updated_list
    });
  };

  onEditItem = id => {
    this.setState({
      show_dialog: true
    });
  };

  onMarkItem = id => {
    var updated_list = this.state.todos.filter(function(item) {
      if (item.id == id) item.finished = !item.finished;
      return item;
    });
    this.setState({
      todos: updated_list
    });
  };

  /*The following are for dialog */
  handleDialogOpen = () => {
    this.setState({ show_dialog: true });
  };

  handleDialogClose = () => {
    this.setState({ show_dialog: false });
  };
  onEditChange = e => {
    this.setState({
      new_content: e.target.value
    });
  };
  onEditSubmit = e => {
    //this.onEditSubmit(id);
    const { new_content, todos } = this.state;
    var id = JSON.parse(sessionStorage.getItem("id"));
    // console.log("item id:" + id);
    // console.log("new content:" + new_content);
    var updated_list = todos.filter(function(item) {
      if (item.id === id && new_content !== "") item.content = new_content;
      return item;
    });

    this.setState({
      todos: updated_list,
      show_dialog: false
    });
  };

  render() {
    const { classes } = this.props;
    const { todos } = this.state;
    // var count = this.TodosCount;

    return (
      <div className={classes.content}>
        <form onSubmit={this.onSubmit}>
          <Input
            placeholder="Placeholder"
            className={classes.input}
            onChange={this.onAddChange}
            value={this.state.input}
            name="add"
            inputProps={{
              "aria-label": "Description"
            }}
          />
          <Button
            variant="fab"
            mini
            color="secondary"
            aria-label="Add"
            className={classes.button}
            onClick={this.onSubmit}
          >
            <AddIcon />
          </Button>
        </form>
        <small>Total {this.state.todos.length} items.</small>
        <small>You have {this.TodosCount()} items todo!</small>
        <List>
          {todos.map(todo => (
            <TodoItem
              todo={todo}
              id={todo.id}
              checked={todo.finished}
              onDeleteItem={this.onDeleteItem}
              onEditItem={this.onEditItem}
              onMarkItem={this.onMarkItem}
            />
          ))}
        </List>
        <div>
          <Dialog
            open={this.state.show_dialog}
            onClose={this.handleDialogClose}
            aria-labelledby="edit-form-dialog"
          >
            <DialogTitle id="edit-form-dialog">编辑项目</DialogTitle>
            <DialogContent>
              <DialogContentText>
                你可以修改项目的内容、截止时间、优先级。
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="item content"
                type="text"
                fullWidth
                onChange={this.onEditChange}
                name="edit"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialogClose} color="primary">
                取消
              </Button>
              <Button onClick={this.onEditSubmit} color="primary">
                确认
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TodoList);