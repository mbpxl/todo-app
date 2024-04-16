import { useState } from "react";
import { FilterValuesTypes } from "../../App";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";

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
  changeTaskTitle: (
    taskId: string,
    newValue: string,
    todolistId: string
  ) => void;
  changeTodolistTitle: (todoListId: string, newTitle: string) => void;
};

export const Todolist = (props: PropsType) => {
  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  };

  return (
    <div className="">
      <h3>
        <EditableSpan title={props.title} onChangeTitle={changeTodolistTitle} />
      </h3>
      <button onClick={removeTodoList}>X</button>
      <AddItemForm addItem={addTask} placeholderTitle={"New task"} />
      <ul>
        {props.tasks.map((t) => {
          const onChangeTitle = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
          };
          return (
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
              <EditableSpan title={t.title} onChangeTitle={onChangeTitle} />
              <button
                onClick={() => {
                  props.removeTask(t.id, props.id);
                }}
              >
                X
              </button>
            </li>
          );
        })}
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
