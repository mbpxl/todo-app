import { useState } from "react";
import { AddItemFormTypes } from "./AddItemFormTypes";
import { Button, TextField } from "@mui/material";
import React from "react";

export const AddItemForm = React.memo((props: AddItemFormTypes) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const submitNewTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addItem(newTaskTitle);
      setNewTaskTitle(" ");
    } else {
      setError("Title is required!");
      console.log(newTaskTitle);
    }
  };

  const onChangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget?.value);
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) setError(null);
    if (e.charCode === 13) submitNewTask();
  };

  return (
    <div className="">
      <TextField
        error={!!error}
        helperText={error}
        id="standard-basic"
        label={props.placeholderTitle}
        variant="standard"
        defaultValue={newTaskTitle}
        onChange={onChangeChange}
        onKeyPress={onKeyPressHandler}
      />
      <Button variant="contained" onClick={submitNewTask}>
        +
      </Button>
    </div>
  );
});
