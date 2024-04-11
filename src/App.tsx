import React, { useState } from "react";
import "./assets/style.scss";
import { Todolist } from "./components/Todolist/Todolist";
import { v1 } from "uuid";

export type FilterValuesTypes = "All" | "Completed" | "Active";

const App = () => {
  const [tasks, setTasks] = useState<
    Array<{ id: string; title: string; isDone: boolean }>
  >([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "React", isDone: true },
    { id: v1(), title: "Vue", isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterValuesTypes>("All");
  let tasksForTodoList = tasks;
  if (filter === "Completed") {
    tasksForTodoList = tasks.filter((t) => t.isDone);
  } else if (filter === "Active") {
    tasksForTodoList = tasks.filter((t) => !t.isDone);
  }

  const removeTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const changeFilter = (value: FilterValuesTypes) => {
    setFilter(value);
  };

  const addTask = (newTitle: string) => {
    let newTask = { id: v1(), title: newTitle, isDone: false };
    let distTasks = [newTask, ...tasks];
    setTasks(distTasks);
  };

  return (
    <div className="todolist">
      <Todolist
        title="What to learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
};

export default App;
