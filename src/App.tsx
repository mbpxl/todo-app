import React from "react";
import "./assets/style.scss";
import { Todolist } from "./components/Todolist/Todolist";

const App = () => {
  let tasksProger = [
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "React", isDone: true },
    { id: 3, title: "Vue", isDone: false },
  ];

  let tasksFilm = [
    { id: 1, title: "Spider man", isDone: true },
    { id: 2, title: "Twenty-one", isDone: true },
    { id: 3, title: "Hangover", isDone: true },
  ];

  return (
    <div className="todolist">
      <Todolist title="What to learn" tasks={tasksProger} />
      <Todolist title="Movies" tasks={tasksFilm} />
    </div>
  );
};

export default App;
