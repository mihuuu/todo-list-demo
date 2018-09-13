import { observable, computed, action } from "mobx";

export default class TodoListModel {
	@observable todos = [];
    @observable pendingRequests = 0;

    // constructor() {
    //     mobx.autorun(() => console.log(this.report));
    // }

	@computed get completedTodosCount() {
    	return this.todos.filter(
			todo => todo.completed === true
		).length;
    }

	@computed get report() {
		if (this.todos.length === 0)
			return "<none>";
		return `Next todo: "${this.todos[0].task}". ` +
			`Progress: ${this.completedTodosCount}/${this.todos.length}`;
	}

	AddTodo(content) {
		this.todos.push({
			content: content,
			completed: false,
			assignee: null	//??
		});
	}
}
