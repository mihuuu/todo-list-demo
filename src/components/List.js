import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TodoItem from "./Item";
import EditDialog from "./Dialog";
import PriDialog from './PriDialog';

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
    todos: [],
    input: "",
    new_content: "",
    select_id: undefined,
    show_dialog: false,
    show_pri_dialog: false,
    show_date_dialog: false,
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

  onEditContent = (id, content) => {
    this.setState({
			show_dialog: true,
      select_id: id,
      item_content: content,
		});
		console.log("select item id:" + id);
  };

	onDialogClose = () => {
		this.setState({
			show_dialog: false,
		})
  }
  
  onPriDialogClose = () => {
		this.setState({
			show_pri_dialog: false,
		})
	}

  onEditDate = (id) => {
    this.setState({
			show_date_dialog: true,
      select_id: id,
		});
  }

  onEditPriority = (id) => {
    this.setState({
			show_pri_dialog: true,
      select_id: id,
		});
  }

  render() {
    const { classes } = this.props;
    const { todos , show_dialog} = this.state;
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
              onEditContent={this.onEditContent}
              onUpdateList={this.getAllItems}
              onEditPriority={this.onEditPriority}
              onEditDate={this.onEditDate}
            />
          ))}
        </List>
  
				<EditDialog open={show_dialog} id={this.state.select_id} content={this.state.item_content}
										onClose={this.onDialogClose} onUpdateList={this.getAllItems}/>
        <PriDialog open={this.state.show_pri_dialog} 
          id={this.state.select_id}
          onClose={this.onPriDialogClose} 
          onUpdateList={this.getAllItems}/>
        
      </div>
    );
  }
}

TodoList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TodoList);