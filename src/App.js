// import './App.css';
import './myCSS.css';
import {useTheme} from'@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ButtonGroup';
import React, { useRef, useEffect, useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import {nanoid} from "nanoid";
import usePrevious from "./components/UsePrevious.js";

//style imports from dashboard example
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import NotificationsIcon from '@mui/icons-material/Notifications';

/* Using Material UI: https://mui.com/material-ui/react-button-group/ */

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const tasksNoun = tasks.length !== 1 ? 'tasks' : 'task';
  const headingText = `${tasks.length} ${tasksNoun} remaining`;
  const [filter, setFilter] = useState('All');
  const listHeadingRef = useRef(null);

  function addTask(name) {
    const newTask = {id: 'todo-'+nanoid(), name: name, completed: false};
    setTasks([...tasks,newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map( (task) => {
      //if this task has the same ID as edited task
      if (id===task.id) {
        return{...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter( (task) => id !== task.id);
    setTasks (remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map( (task) => {
      if (id === task.id) {
        return {...task,name:newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo 
      name={task.name} 
      completed={task.completed} 
      id={task.id} 
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map( (name) => (
    <FilterButton 
      key={name} 
      name={name}
      isPressed={name===filter}
      setFilter={setFilter}
    />
  ));

  const prevTaskLength = usePrevious(tasks.length);

  useEffect( () => {
    if (prevTaskLength - tasks.length ===1) {
      listHeadingRef.current.focus();
    }
  },[tasks.length, prevTaskLength]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <h1>My Todolist</h1>
        <Form addTask={addTask}/>
        <ToggleButtonGroup className="filters btn-group stack-exception">
          {filterList}
        </ToggleButtonGroup>
        <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
          {headingText}
        </h2>
        <Stack
          // role="list"
          // className="todo-list stack-large stack-exception"
          // aria-labelledby="list-heading"
        >
          {taskList}
        </Stack>
      </Container>
    </React.Fragment>
  );
}


export default App;
