import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { FilterButtons } from "../FilterButtons/FilterButtons";
import { FilterValuesTypes } from "../../App";
import { useCallback } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  removeTodoListAC,
} from "../../data/tasks-reducer";
import {
  changeTodoListAC,
  removeTodoListsAC,
} from "../../data/todolists-reducer";
import { Task } from "../Task/Task";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  todoListId: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesTypes;
};

export const Todolist = React.memo((props: PropsType) => {
  //! =====================================REDUX TOOLS=====================================
  const dispatch = useDispatch();
  //! =====================================REDUX TOOLS=====================================

  //* callback for ADD TASK in current container
  const addTask = useCallback(
    (newTitle: string) => {
      dispatch(addTaskAC(newTitle, props.todoListId));
    },
    [dispatch, props.todoListId]
  );

  //* callback for REMOVE TODOLIST in IconButton (delete) component
  const removeTodoList = useCallback(() => {
    dispatch(removeTodoListAC(props.todoListId));
    dispatch(removeTodoListsAC(props.todoListId));
  }, [dispatch, props.todoListId]);

  //* callback to EditableSpan component (double-click activate TODOLIST TITLE EDIT)
  const changeTodolistTitle = useCallback(
    (newTitle: string) => {
      dispatch(changeTodoListAC(props.todoListId, newTitle));
    },
    [dispatch, props.todoListId]
  );

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
          return <Task t={t} todoListId={props.todoListId} />;
        })}
      </ul>
      <div className="">
        <FilterButtons filter={props.filter} id={props.todoListId} />
      </div>
    </div>
  );
});
