import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Header from './components/Header';
import LeftMenu from './components/Menu';
import TodoList from './components/List';
import TodoListModel from './models/TodoListModel'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const todoListStore = new TodoListModel();

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 580,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
});

class App extends Component {
  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <Header/>
        <LeftMenu/>
        <main className={classes.content}>
          <TodoList store={todoListStore}/>
        </main>
      </div>    
    );
  }
}

export default withStyles(styles)(App);
