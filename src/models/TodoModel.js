import { observable } from "mobx";

export default class TodoModel {
  id = Math.random();
  @observable content;
  @observable completed = false;

  constructor(title) {
    this.content = this.content;
  }
}