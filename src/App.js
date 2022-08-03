import './App.css';
import React, { useRef, useEffect, useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import {nanoid} from "nanoid";
import usePrevious from "./components/UsePrevious.js";

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
    <div className="todoapp stack-large">
      <h1>My Super Duper Todolist</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}


export default App;
