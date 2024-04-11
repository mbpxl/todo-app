import { useState } from "react";
import { FilterValuesTypes } from "../../App";

type PropsType = {
  title: string;
  tasks: Array<{ id: string; title: string; isDone: boolean }>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesTypes) => void;
  addTask: (newTitle: string) => void;
};

export const Todolist = (props: PropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onNewTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget?.value);
  };

  const submitNewTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle("");
  };

  return (
    <div className="">
      <h3>{props.title}</h3>
      <div className="">
        <input
          type="text"
          placeholder="New task"
          value={newTaskTitle}
          onChange={onNewTaskChange}
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              submitNewTask();
            }
          }}
        />
        <button onClick={submitNewTask}>+</button>
      </div>
      <ul>
        {props.tasks.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.isDone} />
            <span>{t.title}</span>
            <button
              onClick={() => {
                props.removeTask(t.id);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <div className="">
        <button
          onClick={() => {
            props.changeFilter("All");
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            props.changeFilter("Active");
          }}
        >
          Active
        </button>
        <button
          onClick={() => {
            props.changeFilter("Completed");
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
