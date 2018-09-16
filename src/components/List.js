import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TodoItem from "./Item";
import EditDialog from "./Dialog";

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
		new_content: "",
    select_id: undefined,
  };

  getAllItems = () => {
    var todos_url = "http://127.0.0.1:8000/api/all/";
    fetch(todos_url, {
      method: "GET",
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(res => {
        this.setState({"todos": res});
      })
  }

	componentDidMount() {
		this.getAllItems();
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
    if (input !== "") {
			const add_url = "http://127.0.0.1:8000/api/add_todo/";
			fetch(add_url, {
				method: 'POST',
				headers: {'Content-Type': 'application/json',},
				body: JSON.stringify({
					id: Date.now(),
					content: input,
				})
			}).then(
				res => res.json()
			).then(res => {
				this.setState({
					todos: [res, ...this.state.todos],
					input: ''
				})
			})
    }

  };

  onEditItem = (id) => {
    this.setState({
			show_dialog: true,
			select_id: id, 
		});
		console.log("select item id:" + id);
  };

	onDialogClose = () => {
		this.setState({
			show_dialog: false,
		})
	}
  // /*The following are for dialog */
  // handleDialogOpen = () => {
  //   this.setState({ show_dialog: true });
  // };

  // handleDialogClose = () => {
  //   this.setState({ show_dialog: false });
  // };
  // onEditChange = e => {
  //   this.setState({
  //     new_content: e.target.value
  //   });
  // };
  // onEditSubmit = e => {
  //   //this.onEditSubmit(id);
  //   const { new_content, todos } = this.state;
  //   var id = JSON.parse(sessionStorage.getItem("id"));
  //   // console.log("item id:" + id);
  //   // console.log("new content:" + new_content);
  //   var updated_list = todos.filter(function(item) {
  //     if (item.id === id && new_content !== "") item.content = new_content;
  //     return item;
  //   });

  //   this.setState({
  //     todos: updated_list,
  //     show_dialog: false
  //   });
  // };

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
              onEditItem={this.onEditItem}
							onUpdateList={this.getAllItems}
            />
          ))}
        </List>
				<EditDialog open={this.state.show_dialog} id={this.state.select_id}
										onClose={this.onDialogClose} onUpdateList={this.getAllItems}/>
      </div>
    );
  }
}

TodoList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TodoList);