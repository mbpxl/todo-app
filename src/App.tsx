import React, { useState } from "react";
import "./assets/style.scss";
import { Todolist } from "./components/Todolist/Todolist";

export type FilterValuesTypes = "All" | "Completed" | "Active";

const App = () => {
  const [tasks, setTasks] = useState<
    Array<{ id: number; title: string; isDone: boolean }>
  >([
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "React", isDone: true },
    { id: 3, title: "Vue", isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterValuesTypes>("All");
  let tasksForTodoList = tasks;
  if (filter === "Completed") {
    tasksForTodoList = tasks.filter((t) => t.isDone);
  } else if (filter === "Active") {
    tasksForTodoList = tasks.filter((t) => !t.isDone);
  }

  /* //todo:
  let tasksFilm = [
    { id: 10, title: "Spider man", isDone: true },
    { id: 11, title: "Twenty-one", isDone: true },
    { id: 12, title: "Hangover", isDone: true },
  ];
  */

  const removeTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const changeFilter = (value: FilterValuesTypes) => {
    setFilter(value);
  };

  return (
    <div className="todolist">
      <Todolist
        title="What to learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
};

export default App;
