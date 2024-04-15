import { useState } from "react";
import { FilterValuesTypes } from "../../App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesTypes, todolistId: string) => void;
  addTask: (newTitle: string, todolistId: string) => void;
  changeIsDoneStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
  filter: FilterValuesTypes;
  removeTodoList: (todolistId: string) => void;
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
    props.addTask(newTaskTitle.trim(), props.id);
    setNewTaskTitle("");
    setError(false);
  };

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  return (
    <div className="">
      <h3>{props.title}</h3>
      <button onClick={removeTodoList}>X</button>
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
                props.changeIsDoneStatus(
                  t.id,
                  e.currentTarget.checked,
                  props.id
                );
              }}
            />
            <span>{t.title}</span>
            <button
              onClick={() => {
                props.removeTask(t.id, props.id);
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
            props.changeFilter("All", props.id);
          }}
        >
          All
        </button>
        <button
          className={props.filter === "Active" ? "active-filter" : ""}
          onClick={() => {
            props.changeFilter("Active", props.id);
          }}
        >
          Active
        </button>
        <button
          className={props.filter === "Completed" ? "active-filter" : ""}
          onClick={() => {
            props.changeFilter("Completed", props.id);
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
