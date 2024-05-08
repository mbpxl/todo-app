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

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
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
      dispatch(addTaskAC(newTitle, props.id));
    },
    [dispatch, props.id]
  );

  //* callback for REMOVE TASK in current component
  const removeTask = useCallback(
    (id: string, todolistId: string) => {
      dispatch(removeTaskAC(id, todolistId));
    },
    [dispatch]
  );

  //* callback for change isDone status in current component
  const changeIsDoneStatus = useCallback(
    (taskId: string, todolistId: string, isDone: boolean) => {
      dispatch(changeTaskStatusAC(taskId, todolistId, isDone));
    },
    [dispatch]
  );

  //* callback for change task title in current component
  const changeTaskTitle = useCallback(
    (taskId: string, todolistId: string, newTitle: string) => {
      dispatch(changeTaskTitleAC(taskId, todolistId, newTitle));
    },
    [dispatch]
  );

  //* callback for REMOVE TODOLIST in IconButton (delete) component
  const removeTodoList = useCallback(() => {
    dispatch(removeTodoListAC(props.id));
    dispatch(removeTodoListsAC(props.id));
  }, [dispatch, props.id]);

  //* callback to EditableSpan component (double-click activate TODOLIST TITLE EDIT)
  const changeTodolistTitle = useCallback(
    (newTitle: string) => {
      dispatch(changeTodoListAC(props.id, newTitle));
    },
    [dispatch, props.id]
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
          //* callback to EditableSpan component (double-click activate TASK TITLE EDIT)
          const onChangeTaskTitle = (newValue: string) => {
            changeTaskTitle(t.id, props.id, newValue);
          };

          const changeCheckedState = (
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            changeIsDoneStatus(t.id, props.id, e.currentTarget.checked);
          };
          return (
            <li key={t.id}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={changeCheckedState}
              />
              <EditableSpan title={t.title} onChangeTitle={onChangeTaskTitle} />
              <IconButton
                onClick={() => {
                  removeTask(t.id, props.id);
                }}
              >
                <Delete />
              </IconButton>
            </li>
          );
        })}
      </ul>
      <div className="">
        <FilterButtons filter={props.filter} id={props.id} />
      </div>
    </div>
  );
});
