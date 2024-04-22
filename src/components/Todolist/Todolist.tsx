import { useState } from "react";
import { FilterValuesTypes } from "../../App";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { Button, IconButton } from "@mui/material";
import { CheckBox, Delete } from "@mui/icons-material";
import { FilterButtons } from "../FilterButtons/FilterButtons";

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
      <div className="todolist-title">
        <h3>
          <EditableSpan
            title={props.title}
            onChangeTitle={changeTodolistTitle}
          />
        </h3>
        <IconButton onClick={removeTodoList}>
          <Delete />
        </IconButton>
      </div>
      <AddItemForm addItem={addTask} placeholderTitle={"New task"} />
      <ul>
        {props.tasks.map((t) => {
          const onChangeTitle = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
          };

          const changeCheckedState = (
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            props.changeIsDoneStatus(t.id, e.currentTarget.checked, props.id);
          };
          return (
            <li key={t.id}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={changeCheckedState}
              />
              <EditableSpan title={t.title} onChangeTitle={onChangeTitle} />

              <IconButton
                onClick={() => {
                  props.removeTask(t.id, props.id);
                }}
              >
                <Delete />
              </IconButton>
            </li>
          );
        })}
      </ul>
      <div className="">
        <FilterButtons
          filter={props.filter}
          id={props.id}
          changeFilter={props.changeFilter}
        />
      </div>
    </div>
  );
};
