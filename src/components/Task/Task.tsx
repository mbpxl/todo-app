import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  removeTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
} from "../../data/tasks-reducer";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { TaskType } from "../Todolist/Todolist";

type TaskPropsType = {
  todoListId: string;
  t: TaskType;
};

export const Task = React.memo((props: TaskPropsType) => {
  //! =====================================REDUX TOOLS=====================================
  const dispatch = useDispatch();
  //! =====================================REDUX TOOLS=====================================

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

  const changeCheckedState = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeIsDoneStatus(props.t.id, props.todoListId, e.currentTarget.checked);
  };

  //* callback for change task title in current component
  const changeTaskTitle = useCallback(
    (taskId: string, todolistId: string, newTitle: string) => {
      dispatch(changeTaskTitleAC(taskId, todolistId, newTitle));
    },
    [dispatch]
  );

  //* callback to EditableSpan component (double-click activate TASK TITLE EDIT)
  const onChangeTaskTitle = (newValue: string) => {
    changeTaskTitle(props.t.id, props.todoListId, newValue);
  };
  return (
    <li key={props.t.id}>
      <input
        type="checkbox"
        checked={props.t.isDone}
        onChange={changeCheckedState}
      />
      <EditableSpan title={props.t.title} onChangeTitle={onChangeTaskTitle} />
      <IconButton
        onClick={() => {
          removeTask(props.t.id, props.todoListId);
        }}
      >
        <Delete />
      </IconButton>
    </li>
  );
});
