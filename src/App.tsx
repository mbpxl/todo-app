import { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';

export type filterValuesTypes = "all" | "completed" | "active";

function App() {

  const head = [
    'What to learn'
  ];

  const [tasks, setTasks] = useState([
    {id: 1109, title: "HTML&CSS", isDone: true},
    {id: 8288, title: "JS", isDone: true},
    {id: 4310, title: "React", isDone: false},
    {id: 6425, title: "Redux", isDone: false},
  ]);
  
  const [filter, setFilter] = useState<filterValuesTypes>();

  function removeTask(id: number) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }

  function changeFilter(value: filterValuesTypes) {
    setFilter(value);
  }

  let switchedTasks = tasks;
  if (filter === "completed") {
    switchedTasks = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    switchedTasks = tasks.filter((t) => t.isDone === false);
  }
  
  return (
    <div className="App">
      <TodoList heading={head} tasks={switchedTasks} removeTask={removeTask} changeFilter={changeFilter}/>
    </div>
  );
}

export default App;