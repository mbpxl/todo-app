import { useState } from "react";
import { FilterValuesTypes } from "../../App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesTypes) => void;
  addTask: (newTitle: string) => void;
  changeIsDoneStatus: (taskId: string, isDone: boolean) => void;
  filter: FilterValuesTypes;
};

export const Todolist = (props: PropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const [error, setError] = useState(false);

  const onNewTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget?.value);
  };

  const submitNewTask = () => {
    if (newTaskTitle.trim() === "") {
      setError(true);
      return;
    }
    props.addTask(newTaskTitle.trim());
    setNewTaskTitle("");
    setError(false);
  };

  return (
    <div className="">
      <h3>{props.title}</h3>
      <div className="">
        <input
          className={error ? "error" : ""}
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
        {error && <div className="error-message">Fuild is required</div>}
      </div>
      <ul>
        {props.tasks.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.isDone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                props.changeIsDoneStatus(t.id, e.currentTarget.checked);
              }}
            />
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
          className={props.filter === "All" ? "active-filter" : ""}
          onClick={() => {
            props.changeFilter("All");
          }}
        >
          All
        </button>
        <button
          className={props.filter === "Active" ? "active-filter" : ""}
          onClick={() => {
            props.changeFilter("Active");
          }}
        >
          Active
        </button>
        <button
          className={props.filter === "Completed" ? "active-filter" : ""}
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
